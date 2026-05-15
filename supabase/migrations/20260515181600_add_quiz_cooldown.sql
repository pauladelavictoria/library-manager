-- Add last_quiz_attempt to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_quiz_attempt TIMESTAMP WITH TIME ZONE;
