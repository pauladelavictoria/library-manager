-- Habilitar la extensión para generar UUIDs (si no está habilitada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de Autores (Opcional si guardas todo como texto en books, pero útil si quieres perfiles de autor)
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Tabla de Categorías (Opcional, útil para tener un catálogo maestro)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Tabla de Editoriales (Opcional)
CREATE TABLE publishers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. Tabla de Libros (Desnormalizada para consumir la API de Google)
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    isbn TEXT UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    authors TEXT[], -- Array de strings para guardar los autores directamente
    publisher TEXT, -- Nombre de la editorial directo
    published_date TEXT, -- Tipo TEXT porque Google a veces devuelve "YYYY" o "YYYY-MM"
    categories TEXT[], -- Array de strings para las categorías
    page_count INTEGER,
    cover_url TEXT,
    cost_price NUMERIC(10, 2), -- Costo para la tienda
    selling_price NUMERIC(10, 2), -- Precio de venta al público
    stock_quantity INTEGER DEFAULT 0,
    reorder_threshold INTEGER DEFAULT 5, -- Límite para añadir a la lista de reposición
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Políticas de Seguridad RLS (Row Level Security) básicas para Supabase
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE publishers ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede ver los libros, autores, etc. (Público)
CREATE POLICY "Public profiles are viewable by everyone." ON books FOR SELECT USING (true);
CREATE POLICY "Public authors are viewable by everyone." ON authors FOR SELECT USING (true);
CREATE POLICY "Public categories are viewable by everyone." ON categories FOR SELECT USING (true);
CREATE POLICY "Public publishers are viewable by everyone." ON publishers FOR SELECT USING (true);
