-- Script para generar usuarios de prueba adicionales
-- No borra usuarios previos. Si un correo ya existe, simplemente lo ignora.

DO $$
DECLARE
    user_names TEXT[] := ARRAY[
        'Ana García', 'Carlos Ruiz', 'Elena Martínez', 'David López', 'Sofía Castro', 
        'Javier Sanz', 'Lucía Blanco', 'Marcos Vidal', 'Marta Soler', 'Pablo Torres',
        'Ricardo Gómez', 'Beatriz Peña', 'Hugo Herrera', 'Isabel Ortiz', 'Mateo Flores'
    ];
    user_email TEXT;
BEGIN
    FOR i IN 1..array_length(user_names, 1) LOOP
        user_email := lower(replace(user_names[i], ' ', '.')) || '@example.com';
        
        -- Solo insertamos si el email no existe ya en auth.users
        IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = user_email) THEN
            INSERT INTO auth.users (
                instance_id, 
                id, 
                aud, 
                role, 
                email, 
                encrypted_password, 
                email_confirmed_at, 
                raw_app_meta_data, 
                raw_user_meta_data, 
                created_at, 
                updated_at,
                confirmation_token,
                email_change,
                email_change_token_new,
                recovery_token
            )
            VALUES (
                '00000000-0000-0000-0000-000000000000',
                uuid_generate_v4(),
                'authenticated',
                'authenticated',
                user_email,
                crypt('password123', gen_salt('bf')),
                NOW(),
                '{"provider":"email","providers":["email"]}',
                jsonb_build_object('full_name', user_names[i]),
                NOW(),
                NOW(),
                '',
                '',
                '',
                ''
            );
        END IF;
    END LOOP;

    RAISE NOTICE 'Proceso completado. Se han añadido nuevos usuarios de prueba sin afectar a los existentes.';
END $$;
