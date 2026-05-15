-- Table for quiz scores
CREATE TABLE IF NOT EXISTS public.quiz_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    category TEXT DEFAULT 'general',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- RLS
ALTER TABLE public.quiz_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own scores." ON public.quiz_scores
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scores." ON public.quiz_scores
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all scores." ON public.quiz_scores
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.is_admin = true
        )
    );
