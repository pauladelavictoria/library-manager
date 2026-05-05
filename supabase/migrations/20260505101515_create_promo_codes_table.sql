-- Migration to create promo_codes table
CREATE TABLE IF NOT EXISTS promo_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    discount_amount NUMERIC(10, 2) NOT NULL,
    expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- Allow public read access (or authenticated if preferred, but usually promo codes are checked against the DB)
CREATE POLICY "Promo codes are viewable by everyone." ON promo_codes FOR SELECT USING (true);

-- Insert test data
INSERT INTO promo_codes (code, discount_amount, expiry_date) VALUES 
('PROMO10', 10.00, NOW() + INTERVAL '1 month'),
('EXPIRED5', 5.00, NOW() - INTERVAL '1 day')
ON CONFLICT (code) DO NOTHING;
