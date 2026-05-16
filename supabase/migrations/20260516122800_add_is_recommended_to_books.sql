-- Add is_recommended column to books table
ALTER TABLE public.books ADD COLUMN is_recommended BOOLEAN DEFAULT false;

-- Index for faster filtering of recommendations
CREATE INDEX idx_books_recommended ON public.books (is_recommended) WHERE is_recommended = true;
