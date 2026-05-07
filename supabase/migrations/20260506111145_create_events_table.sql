-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    image_url TEXT,
    type TEXT DEFAULT 'generic', -- 'signing', 'workshop', 'club', 'presentation'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- RLS Policies
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone." ON public.events
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage events." ON public.events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.is_admin = true
        )
    );

-- Insert some initial fake events
INSERT INTO public.events (title, description, location, event_date, type)
VALUES 
('Presentación: El Silencio de la Ciudad', 'El autor Javier Sanz nos presenta su última novela negra ambientada en las calles de Madrid.', 'Sala Principal', NOW() + INTERVAL '2 days', 'presentation'),
('Club de Lectura: Clásicos Modernos', 'Este mes analizamos "Cien años de soledad". Café y debate asegurado.', 'Rincón del Lector', NOW() + INTERVAL '5 days', 'club'),
('Taller de Escritura Creativa', 'Aprende las técnicas básicas para construir personajes inolvidables.', 'Planta 1', NOW() + INTERVAL '10 days', 'workshop'),
('Firma de Libros: Ana García', 'Ven a conocer a la ganadora del último premio de novela joven.', 'Entrada Principal', NOW() + INTERVAL '15 days', 'signing');
