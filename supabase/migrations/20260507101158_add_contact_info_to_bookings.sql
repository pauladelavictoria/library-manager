-- Add full_name and email columns to event_bookings for direct contact
ALTER TABLE public.event_bookings 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT;
