ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;

-- Function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- To make a user an admin, run this SQL in the Supabase SQL Editor:
-- UPDATE public.profiles SET is_admin = true WHERE email = 'user@example.com';
