-- Table for quiz questions
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of strings
    answer INTEGER NOT NULL, -- Index of correct option
    category TEXT DEFAULT 'general',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- RLS
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view questions." ON public.quiz_questions
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage questions." ON public.quiz_questions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.is_admin = true
        )
    );

-- Seed 50 questions about books
INSERT INTO public.quiz_questions (question, options, answer, category) VALUES
('¿Quién escribió ''Cien años de soledad''?', '["Gabriel García Márquez", "Mario Vargas Llosa", "Isabel Allende", "Julio Cortázar"]', 0, 'literatura'),
('¿Cuál es el libro más vendido después de la Biblia?', '["Don Quijote de la Mancha", "Harry Potter", "El Principito", "Historia de dos ciudades"]', 0, 'literatura'),
('¿En qué año se publicó el primer libro de Harry Potter?', '["1995", "1997", "2000", "1993"]', 1, 'literatura'),
('¿Cómo se llama el detective creado por Arthur Conan Doyle?', '["Hércules Poirot", "Sherlock Holmes", "Arsenio Lupin", "Sam Spade"]', 1, 'literatura'),
('¿A qué autor pertenece la distopía ''1984''?', '["Aldous Huxley", "Ray Bradbury", "George Orwell", "Isaac Asimov"]', 2, 'literatura'),
('¿Quién es la autora de ''Orgullo y Prejuicio''?', '["Charlotte Brontë", "Emily Brontë", "Jane Austen", "Virginia Woolf"]', 2, 'literatura'),
('¿Qué libro comienza con: "En un lugar de la Mancha..."?', '["El buscón", "Don Quijote de la Mancha", "Lazarillo de Tormes", "La Celestina"]', 1, 'literatura'),
('¿Quién escribió ''La metamorfosis''?', '["Friedrich Nietzsche", "Franz Kafka", "Thomas Mann", "Stefan Zweig"]', 1, 'literatura'),
('¿Cuál es el nombre del capitán en ''Moby Dick''?', '["Capitán Nemo", "Capitán Ahab", "Capitán Garfio", "Capitán Silver"]', 1, 'literatura'),
('¿Quién escribió ''El código Da Vinci''?', '["John Grisham", "Dan Brown", "Stephen King", "Ken Follett"]', 1, 'literatura'),
('¿En qué ciudad vive Sherlock Holmes?', '["Liverpool", "Londres", "Manchester", "Oxford"]', 1, 'literatura'),
('¿Quién es el autor de ''El Principito''?', '["Antoine de Saint-Exupéry", "Victor Hugo", "Albert Camus", "Jean-Paul Sartre"]', 0, 'literatura'),
('¿Qué autor escribió ''Crónica de una muerte anunciada''?', '["Juan Rulfo", "Gabriel García Márquez", "Carlos Fuentes", "Jorge Luis Borges"]', 1, 'literatura'),
('¿Cómo se llama la protagonista de ''Los Juegos del Hambre''?', '["Beatrice Prior", "Katniss Everdeen", "Hermione Granger", "Clary Fray"]', 1, 'literatura'),
('¿Quién escribió ''Frankenstein''?', '["Mary Shelley", "Bram Stoker", "Edgar Allan Poe", "Oscar Wilde"]', 0, 'literatura'),
('¿Cuál es el verdadero nombre de Lewis Carroll?', '["Charles Dickens", "Charles Lutwidge Dodgson", "Samuel Clemens", "Eric Blair"]', 1, 'literatura'),
('¿Quién escribió ''Ulysses''?', '["Virginia Woolf", "James Joyce", "T.S. Eliot", "Samuel Beckett"]', 1, 'literatura'),
('¿Qué autor creó el mundo de la Tierra Media?', '["C.S. Lewis", "J.R.R. Tolkien", "George R.R. Martin", "Ursula K. Le Guin"]', 1, 'literatura'),
('¿Quién escribió ''Rayuela''?', '["Julio Cortázar", "Roberto Bolaño", "Jorge Luis Borges", "Adolfo Bioy Casares"]', 0, 'literatura'),
('¿Cómo se llama el narrador de ''Moby Dick''?', '["Ahab", "Queequeg", "Ishmael", "Starbuck"]', 2, 'literatura'),
('¿Quién escribió ''El retrato de Dorian Gray''?', '["Oscar Wilde", "Lord Byron", "Percy Shelley", "John Keats"]', 0, 'literatura'),
('¿En qué libro aparece el personaje de Sancho Panza?', '["El Cid", "Don Quijote de la Mancha", "La Galatea", "Novelas Ejemplares"]', 1, 'literatura'),
('¿Quién escribió ''Los Miserables''?', '["Alexandre Dumas", "Victor Hugo", "Gustave Flaubert", "Honoré de Balzac"]', 1, 'literatura'),
('¿Qué autor escribió ''Fahrenheit 451''?', '["George Orwell", "Ray Bradbury", "Philip K. Dick", "H.G. Wells"]', 1, 'literatura'),
('¿Quién es la autora de ''Frankenstein''?', '["Jane Austen", "Mary Shelley", "Agatha Christie", "Mary Wollstonecraft"]', 1, 'literatura'),
('¿Cómo se llama la primera parte de ''El Señor de los Anillos''?', '["Las dos torres", "La comunidad del anillo", "El retorno del rey", "El Hobbit"]', 1, 'literatura'),
('¿Quién escribió ''La sombra del viento''?', '["Javier Marías", "Carlos Ruiz Zafón", "Arturo Pérez-Reverte", "Eduardo Mendoza"]', 1, 'literatura'),
('¿Qué autor escribió ''El Aleph''?', '["Jorge Luis Borges", "Julio Cortázar", "Ernesto Sabato", "Mario Benedetti"]', 0, 'literatura'),
('¿Quién escribió ''Crimen y Castigo''?', '["León Tolstói", "Fiódor Dostoyevski", "Antón Chéjov", "Iván Turguénev"]', 1, 'literatura'),
('¿Cómo se llama el colegio de magia en Harry Potter?', '["Beauxbatons", "Durmstrang", "Hogwarts", "Ilvermorny"]', 2, 'literatura'),
('¿Quién escribió ''El viejo y el mar''?', '["Ernest Hemingway", "William Faulkner", "F. Scott Fitzgerald", "John Steinbeck"]', 0, 'literatura'),
('¿Qué autora escribió ''Asesinato en el Orient Express''?', '["P.D. James", "Agatha Christie", "Ruth Rendell", "Patricia Highsmith"]', 1, 'literatura'),
('¿Quién escribió ''La isla del tesoro''?', '["Robert Louis Stevenson", "Daniel Defoe", "Jules Verne", "Herman Melville"]', 0, 'literatura'),
('¿En qué país nació Pablo Neruda?', '["Argentina", "Chile", "Perú", "Colombia"]', 1, 'literatura'),
('¿Quién escribió ''El nombre de la rosa''?', '["Italo Calvino", "Umberto Eco", "Dante Alighieri", "Primo Levi"]', 1, 'literatura'),
('¿Qué libro trata sobre un viaje al centro de la Tierra?', '["La vuelta al mundo en 80 días", "Viaje al centro de la Tierra", "Veinte mil leguas de viaje submarino", "La isla misteriosa"]', 1, 'literatura'),
('¿Quién escribió ''Ensayo sobre la ceguera''?', '["José Saramago", "Fernando Pessoa", "Eça de Queirós", "Luis de Camões"]', 0, 'literatura'),
('¿Cómo se llama la gata en ''Alicia en el país de las maravillas''?', '["Dinah", "Luna", "Kitty", "Chloe"]', 0, 'literatura'),
('¿Quién escribió ''Mujer pequeñas''?', '["Louisa May Alcott", "Emily Dickinson", "Sylvia Plath", "Toni Morrison"]', 0, 'literatura'),
('¿Qué autor escribió ''La Odisea''?', '["Sófocles", "Eurípides", "Homero", "Esquilo"]', 2, 'literatura'),
('¿Quién escribió ''El gran Gatsby''?', '["F. Scott Fitzgerald", "Truman Capote", "Harper Lee", "J.D. Salinger"]', 0, 'literatura'),
('¿Cómo se llama el protagonista de ''El guardián entre el centeno''?', '["Holden Caulfield", "Huckleberry Finn", "Tom Sawyer", "Charlie Brown"]', 0, 'literatura'),
('¿Quién escribió ''Las crónicas de Narnia''?', '["J.R.R. Tolkien", "C.S. Lewis", "Roald Dahl", "Enid Blyton"]', 1, 'literatura'),
('¿Qué libro comienza con: "Llamadme Ismael"?', '["Moby Dick", "La isla del tesoro", "Robinson Crusoe", "Kim"]', 0, 'literatura'),
('¿Quién escribió ''La divina comedia''?', '["Petrarca", "Boccaccio", "Dante Alighieri", "Maquiavelo"]', 2, 'literatura'),
('¿Qué autor escribió ''Crónicas Marcianas''?', '["Isaac Asimov", "Arthur C. Clarke", "Ray Bradbury", "Philip K. Dick"]', 2, 'literatura'),
('¿Quién es el autor de ''Pedro Páramo''?', '["Juan Rulfo", "Octavio Paz", "Gabriel García Márquez", "Jorge Rulfo"]', 0, 'literatura'),
('¿Cómo se llama el protagonista de ''Oliver Twist''?', '["David Copperfield", "Oliver Twist", "Pip", "Nicholas Nickleby"]', 1, 'literatura'),
('¿Quién escribió ''Drácula''?', '["Mary Shelley", "Bram Stoker", "H.P. Lovecraft", "Robert Bloch"]', 1, 'literatura'),
('¿Qué autora escribió ''El cuento de la criada''?', '["Margaret Atwood", "Alice Munro", "Ursula K. Le Guin", "Doris Lessing"]', 0, 'literatura');
