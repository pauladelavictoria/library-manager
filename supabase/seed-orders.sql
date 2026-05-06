-- Script para generar pedidos de prueba con uso de cupones promocionales
-- Genera datos de ventas a lo largo de todo el año 2026

DO $$ 
DECLARE 
    v_user_id UUID;
    v_order_id UUID;
    v_book RECORD;
    v_order_count INTEGER := 40; -- Número de pedidos adicionales
    v_items_per_order INTEGER;
    v_random_date TIMESTAMP;
    v_subtotal NUMERIC;
    v_discount NUMERIC;
    v_apply_promo BOOLEAN;
    v_selected_promo_code TEXT;
    v_selected_promo_discount NUMERIC;
BEGIN
    FOR i IN 1..v_order_count LOOP
        -- 1. Selección de usuario aleatorio (de los existentes)
        SELECT id INTO v_user_id FROM auth.users ORDER BY random() LIMIT 1;
        
        IF v_user_id IS NULL THEN
            RAISE NOTICE 'No hay usuarios en auth.users. Ejecuta primero seed-users.sql';
            RETURN;
        END IF;

        -- 2. Fecha aleatoria en 2026
        v_random_date := TIMESTAMP '2026-01-01 00:00:00' + 
                        random() * (NOW() - TIMESTAMP '2026-01-01 00:00:00');
        
        -- 3. Reiniciar variables de promo para este ciclo
        v_selected_promo_code := NULL;
        v_selected_promo_discount := 0;
        v_apply_promo := (random() < 0.4);

        IF v_apply_promo THEN
            -- Buscamos un código que no haya caducado en la fecha del pedido
            SELECT code, discount_amount INTO v_selected_promo_code, v_selected_promo_discount 
            FROM public.promo_codes 
            WHERE expiry_date > v_random_date 
            ORDER BY random() LIMIT 1;
        END IF;

        -- 4. Crear el registro del pedido
        INSERT INTO public.orders (user_id, total_amount, promo_code, status, created_at)
        VALUES (v_user_id, 0, v_selected_promo_code, 'completed', v_random_date)
        RETURNING id INTO v_order_id;
        
        v_subtotal := 0;
        v_items_per_order := floor(random() * 3 + 1)::int;
        
        -- 5. Añadir entre 1 y 3 libros al pedido
        FOR j IN 1..v_items_per_order LOOP
            SELECT * INTO v_book FROM public.books WHERE selling_price > 0 ORDER BY random() LIMIT 1;
            
            IF v_book.id IS NOT NULL THEN
                INSERT INTO public.order_items (
                    order_id, book_id, title, quantity, price_at_purchase, cover_url, categories, created_at
                )
                VALUES (
                    v_order_id, v_book.id, v_book.title, 1, 
                    v_book.selling_price, v_book.cover_url, v_book.categories, v_random_date
                );
                v_subtotal := v_subtotal + v_book.selling_price;
            END IF;
        END LOOP;
        
        -- 6. Calcular descuento final
        IF v_selected_promo_discount > 0 THEN
            v_discount := (v_subtotal * v_selected_promo_discount / 100);
        ELSE
            v_discount := 0;
        END IF;
        
        -- Actualizamos el total real pagado
        UPDATE public.orders SET total_amount = (v_subtotal - v_discount) WHERE id = v_order_id;
        
    END LOOP;

    RAISE NOTICE 'Generación de pedidos completada exitosamente.';
END $$;
