-- Ensure the column exists (in case it wasn't applied)
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS is_recommended BOOLEAN DEFAULT false;

-- Allow admins to update the is_recommended column
-- Assuming we have an is_admin() function or we check the profiles table
CREATE POLICY "Admins can update book recommendations" ON public.books
    FOR UPDATE
    TO authenticated
    USING ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true )
    WITH CHECK ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true );
