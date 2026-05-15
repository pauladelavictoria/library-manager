-- Add is_one_time column to promo_codes
ALTER TABLE public.promo_codes 
ADD COLUMN IF NOT EXISTS is_one_time BOOLEAN DEFAULT false;
