-- Adición de 100 libros adicionales y sus metadatos
-- Datos generados para complementar la base de datos actual

-- Asegurar que la columna 'name' en 'authors' sea única para usar ON CONFLICT
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'authors_name_key'
    ) THEN
        ALTER TABLE authors ADD CONSTRAINT authors_name_key UNIQUE (name);
    END IF;
END $$;

-- Insertar Autores (evitando duplicados)
INSERT INTO authors (name) VALUES 
('Miguel de Cervantes'), ('Mario Vargas Llosa'), ('Julio Cortázar'), ('Jorge Luis Borges'), 
('Stephen King'), ('Paulo Coelho'), ('J.R.R. Tolkien'), ('F. Scott Fitzgerald'), 
('George Orwell'), ('J.D. Salinger'), ('Jane Austen'), ('Suzanne Collins'), 
('J.K. Rowling'), ('Uwe George'), ('Jhumpa Lahiri'), ('Cormac McCarthy'), 
('Stieg Larsson'), ('Carlos Ruiz Zafón'), ('Dan Brown'), ('Haruki Murakami'), 
('Milan Kundera'), ('Khaled Hosseini'), ('Ann Patchett'), ('Sally Rooney'), 
('Lois Lowry'), ('George R.R. Martin'), ('Isaac Asimov'), ('Frank Herbert'), 
('Brandon Sanderson'), ('Emily St. John Mandel'), ('Taylor Jenkins Reid'), 
('Matt Haig'), ('Daniel Kahneman'), ('Yuval Noah Harari'), ('Ernest Cline'), 
('Tara Westover'), ('Michelle Obama'), ('Barack Obama'), ('Delia Owens'), 
('Celeste Ng'), ('Amor Towles'), ('Daniel James Brown'), ('David McCullough'), 
('Kristin Hannah'), ('Sue Monk Kidd')
ON CONFLICT (name) DO NOTHING;

-- Insertar Categorías (evitando duplicados)
INSERT INTO categories (name) VALUES 
('Fiction'), ('Classic'), ('Latin American'), ('Short Stories'), ('Horror'), 
('Fantasy'), ('Dystopian'), ('Romance'), ('YA'), ('Nonfiction'), ('Science'), 
('Literary'), ('Mystery'), ('Historical'), ('Thriller'), ('Surrealism'), 
('Philosophical'), ('Contemporary'), ('Sci-Fi'), ('Memoir'), ('Self-Help'), 
('Psychology'), ('History'), ('Biography')
ON CONFLICT (name) DO NOTHING;

-- Insertar Editoriales (evitando duplicados)
INSERT INTO publishers (name) VALUES 
('Penguin Classics'), ('Alfaguara'), ('Anagrama'), ('Debolsillo'), ('HarperOne'), 
('Mariner Books'), ('Scribner'), ('Signet Classic'), ('Little, Brown'), 
('Scholastic'), ('Princeton'), ('Vintage'), ('Picador'), ('Doubleday'), 
('Pocket Books'), ('Harper Perennial'), ('Riverhead Books'), ('Harper'), 
('Hogarth'), ('Houghton Mifflin'), ('Bantam'), ('Ace'), ('Tor Books'), 
('Knopf'), ('Washington Square Press'), ('Ballantine Books'), ('Viking'), 
('Canongate Books'), ('Farrar, Straus and Giroux'), ('Spiegel & Grau'), 
('Crown'), ('Random House'), ('G.P. Putnam''s Sons'), ('Penguin Press'), 
('St. Martin''s Press'), ('Simon & Schuster')
ON CONFLICT (name) DO NOTHING;

-- Insertar Libros (evitando duplicados por ISBN)
INSERT INTO books (isbn, title, description, authors, publisher, published_date, categories, page_count, cover_url, cost_price, selling_price, stock_quantity) VALUES 
('9780142437230', 'Don Quijote de la Mancha', 'La obra cumbre de la literatura española.', ARRAY['Miguel de Cervantes']::TEXT[], 'Penguin Classics', '1605', ARRAY['Fiction', 'Classic']::TEXT[], 863, 'https://covers.openlibrary.org/b/isbn/9780142437230-L.jpg', 15.00, 25.99, 10),
('9788420471839', 'La ciudad y los perros', 'Novela que lanzó a la fama a Mario Vargas Llosa.', ARRAY['Mario Vargas Llosa']::TEXT[], 'Alfaguara', '1963', ARRAY['Fiction', 'Latin American']::TEXT[], 464, 'https://covers.openlibrary.org/b/isbn/9788420471839-L.jpg', 12.50, 19.99, 15),
('9788433973344', 'Rayuela', 'Una de las grandes novelas en español del siglo XX.', ARRAY['Julio Cortázar']::TEXT[], 'Anagrama', '1963', ARRAY['Fiction', 'Latin American']::TEXT[], 600, 'https://covers.openlibrary.org/b/isbn/9788433973344-L.jpg', 14.20, 22.50, 8),
('9788497592208', 'Ficciones', 'Colección de relatos breves de Jorge Luis Borges.', ARRAY['Jorge Luis Borges']::TEXT[], 'Debolsillo', '1944', ARRAY['Fiction', 'Short Stories']::TEXT[], 224, 'https://covers.openlibrary.org/b/isbn/9788497592208-L.jpg', 9.80, 15.90, 20),
('9788401352836', 'It', 'Una de las novelas más famosas de Stephen King.', ARRAY['Stephen King']::TEXT[], 'Debolsillo', '1986', ARRAY['Fiction', 'Horror']::TEXT[], 1504, 'https://covers.openlibrary.org/b/isbn/9788401352836-L.jpg', 18.50, 29.99, 12),
('9780062315007', 'The Alchemist', 'A global phenomenon about following your dreams.', ARRAY['Paulo Coelho']::TEXT[], 'HarperOne', '1988', ARRAY['Fiction', 'Fantasy']::TEXT[], 208, 'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg', 8.50, 14.99, 30),
('9780547928227', 'The Hobbit', 'The prelude to The Lord of the Rings.', ARRAY['J.R.R. Tolkien']::TEXT[], 'Mariner Books', '1937', ARRAY['Fiction', 'Fantasy']::TEXT[], 320, 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg', 10.00, 16.99, 25),
('9780743273565', 'The Great Gatsby', 'A classic of American literature.', ARRAY['F. Scott Fitzgerald']::TEXT[], 'Scribner', '1925', ARRAY['Fiction', 'Classic']::TEXT[], 180, 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg', 7.50, 12.99, 18),
('9780451524935', '1984', 'The definitive dystopian novel.', ARRAY['George Orwell']::TEXT[], 'Signet Classic', '1949', ARRAY['Fiction', 'Dystopian']::TEXT[], 328, 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg', 6.99, 11.50, 40),
('9780451526342', 'Animal Farm', 'A powerful political allegory.', ARRAY['George Orwell']::TEXT[], 'Signet Classic', '1945', ARRAY['Fiction', 'Dystopian']::TEXT[], 144, 'https://covers.openlibrary.org/b/isbn/9780451526342-L.jpg', 5.99, 9.99, 35),
('9780316769174', 'The Catcher in the Rye', 'A novel of teenage rebellion.', ARRAY['J.D. Salinger']::TEXT[], 'Little, Brown', '1951', ARRAY['Fiction', 'Classic']::TEXT[], 277, 'https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg', 9.00, 14.99, 20),
('9780141439518', 'Pride and Prejudice', 'The quintessential romantic comedy.', ARRAY['Jane Austen']::TEXT[], 'Penguin Classics', '1813', ARRAY['Fiction', 'Romance']::TEXT[], 480, 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg', 8.50, 13.99, 22),
('9780345339683', 'The Fellowship of the Ring', 'Part one of The Lord of the Rings.', ARRAY['J.R.R. Tolkien']::TEXT[], 'Del Rey', '1954', ARRAY['Fiction', 'Fantasy']::TEXT[], 432, 'https://covers.openlibrary.org/b/isbn/9780345339683-L.jpg', 12.00, 19.99, 15),
('9780345339706', 'The Two Towers', 'Part two of The Lord of the Rings.', ARRAY['J.R.R. Tolkien']::TEXT[], 'Del Rey', '1954', ARRAY['Fiction', 'Fantasy']::TEXT[], 352, 'https://covers.openlibrary.org/b/isbn/9780345339706-L.jpg', 12.00, 19.99, 15),
('9780345339713', 'The Return of the King', 'Part three of The Lord of the Rings.', ARRAY['J.R.R. Tolkien']::TEXT[], 'Del Rey', '1955', ARRAY['Fiction', 'Fantasy']::TEXT[], 464, 'https://covers.openlibrary.org/b/isbn/9780345339713-L.jpg', 12.00, 19.99, 15),
('9780439023528', 'The Hunger Games', 'The start of a hit dystopian series.', ARRAY['Suzanne Collins']::TEXT[], 'Scholastic', '2008', ARRAY['Fiction', 'YA']::TEXT[], 374, 'https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg', 10.50, 17.99, 30),
('9780439064873', 'Harry Potter and the Chamber of Secrets', 'Harry’s second year at Hogwarts.', ARRAY['J.K. Rowling']::TEXT[], 'Scholastic', '1998', ARRAY['Fiction', 'Fantasy']::TEXT[], 341, 'https://covers.openlibrary.org/b/isbn/9780439064873-L.jpg', 11.00, 18.50, 25),
('9780439136365', 'Harry Potter and the Prisoner of Azkaban', 'The arrival of Sirius Black.', ARRAY['J.K. Rowling']::TEXT[], 'Scholastic', '1999', ARRAY['Fiction', 'Fantasy']::TEXT[], 435, 'https://covers.openlibrary.org/b/isbn/9780439136365-L.jpg', 11.00, 18.50, 25),
('9780439139601', 'Harry Potter and the Goblet of Fire', 'The Triwizard Tournament.', ARRAY['J.K. Rowling']::TEXT[], 'Scholastic', '2000', ARRAY['Fiction', 'Fantasy']::TEXT[], 734, 'https://covers.openlibrary.org/b/isbn/9780439139601-L.jpg', 15.00, 24.99, 20),
('9780439358071', 'Harry Potter and the Order of the Phoenix', 'The rise of the resistance.', ARRAY['J.K. Rowling']::TEXT[], 'Scholastic', '2003', ARRAY['Fiction', 'Fantasy']::TEXT[], 870, 'https://covers.openlibrary.org/b/isbn/9780439358071-L.jpg', 15.00, 24.99, 20),
('9780439785969', 'Harry Potter and the Half-Blood Prince', 'Uncovering Voldemort’s past.', ARRAY['J.K. Rowling']::TEXT[], 'Scholastic', '2005', ARRAY['Fiction', 'Fantasy']::TEXT[], 652, 'https://covers.openlibrary.org/b/isbn/9780439785969-L.jpg', 15.00, 24.99, 20),
('9780545010221', 'Harry Potter and the Deathly Hallows', 'The final battle.', ARRAY['J.K. Rowling']::TEXT[], 'Scholastic', '2007', ARRAY['Fiction', 'Fantasy']::TEXT[], 759, 'https://covers.openlibrary.org/b/isbn/9780545010221-L.jpg', 15.00, 24.99, 20),
('9780691149141', 'The Book of Life', 'A profound exploration of human existence.', ARRAY['Uwe George']::TEXT[], 'Princeton', '2010', ARRAY['Nonfiction', 'Science']::TEXT[], 400, 'https://covers.openlibrary.org/b/isbn/9780691149141-L.jpg', 20.00, 35.00, 5),
('9781400032716', 'The Namesake', 'A story of cultural identity.', ARRAY['Jhumpa Lahiri']::TEXT[], 'Mariner Books', '2003', ARRAY['Fiction', 'Literary']::TEXT[], 291, 'https://covers.openlibrary.org/b/isbn/9781400032716-L.jpg', 9.50, 15.99, 10),
('9780307277671', 'The Road', 'A post-apocalyptic journey.', ARRAY['Cormac McCarthy']::TEXT[], 'Vintage', '2006', ARRAY['Fiction', 'Dystopian']::TEXT[], 287, 'https://covers.openlibrary.org/b/isbn/9780307277671-L.jpg', 10.20, 16.99, 15),
('9780307476463', 'The Girl with the Dragon Tattoo', 'A dark and gripping mystery.', ARRAY['Stieg Larsson']::TEXT[], 'Vintage', '2005', ARRAY['Fiction', 'Mystery']::TEXT[], 465, 'https://covers.openlibrary.org/b/isbn/9780307476463-L.jpg', 11.50, 18.99, 20),
('9780307947055', 'The Girl Who Played with Fire', 'The second Lisbeth Salander novel.', ARRAY['Stieg Larsson']::TEXT[], 'Vintage', '2006', ARRAY['Fiction', 'Mystery']::TEXT[], 503, 'https://covers.openlibrary.org/b/isbn/9780307947055-L.jpg', 11.50, 18.99, 20),
('9780307949486', 'The Girl Who Kicked the Hornet''s Nest', 'The final book in the original trilogy.', ARRAY['Stieg Larsson']::TEXT[], 'Vintage', '2007', ARRAY['Fiction', 'Mystery']::TEXT[], 563, 'https://covers.openlibrary.org/b/isbn/9780307949486-L.jpg', 11.50, 18.99, 20),
('9780312424404', 'The Shadow of the Wind', 'A gothic tale set in post-war Barcelona.', ARRAY['Carlos Ruiz Zafón']::TEXT[], 'Picador', '2001', ARRAY['Fiction', 'Historical']::TEXT[], 487, 'https://covers.openlibrary.org/b/isbn/9780312424404-L.jpg', 12.00, 19.99, 25),
('9780385504201', 'The Da Vinci Code', 'A thriller that redefined the genre.', ARRAY['Dan Brown']::TEXT[], 'Doubleday', '2003', ARRAY['Fiction', 'Thriller']::TEXT[], 454, 'https://covers.openlibrary.org/b/isbn/9780385504201-L.jpg', 13.50, 22.99, 30),
('9780385504225', 'Angels & Demons', 'The first Robert Langdon adventure.', ARRAY['Dan Brown']::TEXT[], 'Pocket Books', '2000', ARRAY['Fiction', 'Thriller']::TEXT[], 616, 'https://covers.openlibrary.org/b/isbn/9780385504225-L.jpg', 10.00, 16.99, 25),
('9780385537858', 'Inferno', 'A journey through Dante’s hell.', ARRAY['Dan Brown']::TEXT[], 'Doubleday', '2013', ARRAY['Fiction', 'Thriller']::TEXT[], 480, 'https://covers.openlibrary.org/b/isbn/9780385537858-L.jpg', 14.00, 24.99, 20),
('9780385537865', 'Origin', 'Where do we come from? Where are we going?', ARRAY['Dan Brown']::TEXT[], 'Doubleday', '2017', ARRAY['Fiction', 'Thriller']::TEXT[], 480, 'https://covers.openlibrary.org/b/isbn/9780385537865-L.jpg', 14.00, 24.99, 20),
('9780618260300', 'The Lord of the Rings: One Volume Edition', 'The entire saga in one book.', ARRAY['J.R.R. Tolkien']::TEXT[], 'Mariner Books', '2002', ARRAY['Fiction', 'Fantasy']::TEXT[], 1178, 'https://covers.openlibrary.org/b/isbn/9780618260300-L.jpg', 25.00, 45.00, 10),
('9780679783268', 'The Wind-Up Bird Chronicle', 'A surreal masterpiece.', ARRAY['Haruki Murakami']::TEXT[], 'Vintage', '1994', ARRAY['Fiction', 'Surrealism']::TEXT[], 607, 'https://covers.openlibrary.org/b/isbn/9780679783268-L.jpg', 14.50, 22.99, 12),
('9780307387066', 'Kafka on the Shore', 'A strange and beautiful journey.', ARRAY['Haruki Murakami']::TEXT[], 'Vintage', '2002', ARRAY['Fiction', 'Surrealism']::TEXT[], 467, 'https://covers.openlibrary.org/b/isbn/9780307387066-L.jpg', 13.50, 21.99, 15),
('9780307476203', 'Norwegian Wood', 'A nostalgic story of loss and sexuality.', ARRAY['Haruki Murakami']::TEXT[], 'Vintage', '1987', ARRAY['Fiction', 'Literary']::TEXT[], 296, 'https://covers.openlibrary.org/b/isbn/9780307476203-L.jpg', 10.50, 16.99, 18),
('9780307476449', '1Q84', 'A massive parallel-world epic.', ARRAY['Haruki Murakami']::TEXT[], 'Vintage', '2009', ARRAY['Fiction', 'Fantasy']::TEXT[], 925, 'https://covers.openlibrary.org/b/isbn/9780307476449-L.jpg', 18.00, 29.99, 10),
('9780375704024', 'The Unbearable Lightness of Being', 'A philosophical look at love and politics.', ARRAY['Milan Kundera']::TEXT[], 'Harper Perennial', '1984', ARRAY['Fiction', 'Philosophical']::TEXT[], 314, 'https://covers.openlibrary.org/b/isbn/9780375704024-L.jpg', 11.00, 17.99, 12),
('9780375725272', 'The Kite Runner', 'A story of betrayal and redemption.', ARRAY['Khaled Hosseini']::TEXT[], 'Riverhead Books', '2003', ARRAY['Fiction', 'Historical']::TEXT[], 371, 'https://covers.openlibrary.org/b/isbn/9780375725272-L.jpg', 12.00, 19.99, 20),
('9781594489501', 'A Thousand Splendid Suns', 'An emotional journey through Afghan history.', ARRAY['Khaled Hosseini']::TEXT[], 'Riverhead Books', '2007', ARRAY['Fiction', 'Historical']::TEXT[], 384, 'https://covers.openlibrary.org/b/isbn/9781594489501-L.jpg', 12.50, 19.99, 20),
('9781594631931', 'And the Mountains Echoed', 'A family saga spanning generations.', ARRAY['Khaled Hosseini']::TEXT[], 'Riverhead Books', '2013', ARRAY['Fiction', 'Historical']::TEXT[], 404, 'https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg', 13.00, 21.99, 18),
('9780525557623', 'The Dutch House', 'A story of siblings and the house that shaped them.', ARRAY['Ann Patchett']::TEXT[], 'Harper', '2019', ARRAY['Fiction', 'Literary']::TEXT[], 337, 'https://covers.openlibrary.org/b/isbn/9780525557623-L.jpg', 14.50, 24.99, 10),
('9780525562047', 'Normal People', 'A modern love story.', ARRAY['Sally Rooney']::TEXT[], 'Hogarth', '2018', ARRAY['Fiction', 'Contemporary']::TEXT[], 273, 'https://covers.openlibrary.org/b/isbn/9780525562047-L.jpg', 11.50, 18.99, 15),
('9780525562023', 'Conversations with Friends', 'Rooney’s debut novel.', ARRAY['Sally Rooney']::TEXT[], 'Hogarth', '2017', ARRAY['Fiction', 'Contemporary']::TEXT[], 306, 'https://covers.openlibrary.org/b/isbn/9780525562023-L.jpg', 11.00, 17.99, 12),
('9780544334618', 'The Giver', 'A classic dystopian tale for young readers.', ARRAY['Lois Lowry']::TEXT[], 'Houghton Mifflin', '1993', ARRAY['Fiction', 'YA']::TEXT[], 240, 'https://covers.openlibrary.org/b/isbn/9780544334618-L.jpg', 7.50, 12.50, 30),
('9780547572482', 'Number the Stars', 'A story of bravery in occupied Denmark.', ARRAY['Lois Lowry']::TEXT[], 'Houghton Mifflin', '1989', ARRAY['Fiction', 'Historical']::TEXT[], 137, 'https://covers.openlibrary.org/b/isbn/9780547572482-L.jpg', 6.50, 10.99, 25),
('9780553103540', 'A Game of Thrones', 'The beginning of A Song of Ice and Fire.', ARRAY['George R.R. Martin']::TEXT[], 'Bantam', '1996', ARRAY['Fiction', 'Fantasy']::TEXT[], 694, 'https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg', 18.00, 29.99, 20),
('9780553108033', 'A Clash of Kings', 'The saga continues.', ARRAY['George R.R. Martin']::TEXT[], 'Bantam', '1998', ARRAY['Fiction', 'Fantasy']::TEXT[], 768, 'https://covers.openlibrary.org/b/isbn/9780553108033-L.jpg', 18.00, 29.99, 20),
('9780553106633', 'A Storm of Swords', 'The war intensifies.', ARRAY['George R.R. Martin']::TEXT[], 'Bantam', '2000', ARRAY['Fiction', 'Fantasy']::TEXT[], 973, 'https://covers.openlibrary.org/b/isbn/9780553106633-L.jpg', 18.00, 29.99, 20),
('9780553801507', 'A Feast for Crows', 'The aftermath of war.', ARRAY['George R.R. Martin']::TEXT[], 'Bantam', '2005', ARRAY['Fiction', 'Fantasy']::TEXT[], 753, 'https://covers.openlibrary.org/b/isbn/9780553801507-L.jpg', 18.00, 29.99, 20),
('9780553801477', 'A Dance with Dragons', 'Dragons return to Westeros.', ARRAY['George R.R. Martin']::TEXT[], 'Bantam', '2011', ARRAY['Fiction', 'Fantasy']::TEXT[], 1016, 'https://covers.openlibrary.org/b/isbn/9780553801477-L.jpg', 20.00, 32.99, 20),
('9780553380163', 'Foundation', 'The first book in the Foundation series.', ARRAY['Isaac Asimov']::TEXT[], 'Bantam', '1951', ARRAY['Fiction', 'Sci-Fi']::TEXT[], 244, 'https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg', 9.00, 15.99, 15),
('9780553293357', 'Foundation and Empire', 'The saga continues.', ARRAY['Isaac Asimov']::TEXT[], 'Bantam', '1952', ARRAY['Fiction', 'Sci-Fi']::TEXT[], 247, 'https://covers.openlibrary.org/b/isbn/9780553293357-L.jpg', 9.00, 15.99, 15),
('9780553293333', 'Second Foundation', 'The search for the Second Foundation.', ARRAY['Isaac Asimov']::TEXT[], 'Bantam', '1953', ARRAY['Fiction', 'Sci-Fi']::TEXT[], 240, 'https://covers.openlibrary.org/b/isbn/9780553293333-L.jpg', 9.00, 15.99, 15),
('9780553293371', 'I, Robot', 'The laws of robotics.', ARRAY['Isaac Asimov']::TEXT[], 'Bantam', '1950', ARRAY['Fiction', 'Sci-Fi']::TEXT[], 224, 'https://covers.openlibrary.org/b/isbn/9780553293371-L.jpg', 8.50, 14.99, 20),
('9780553294385', 'The Caves of Steel', 'A robot mystery.', ARRAY['Isaac Asimov']::TEXT[], 'Bantam', '1954', ARRAY['Fiction', 'Sci-Fi']::TEXT[], 206, 'https://covers.openlibrary.org/b/isbn/9780553294385-L.jpg', 8.50, 14.99, 15),
('9780441172719', 'Dune', 'The greatest science fiction epic.', ARRAY['Frank Herbert']::TEXT[], 'Ace', '1965', ARRAY['Fiction', 'Sci-Fi']::TEXT[], 612, 'https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg', 14.00, 24.99, 25),
('9780441013593', 'Dune Messiah', 'The fate of Paul Atreides.', ARRAY['Frank Herbert']::TEXT[], 'Ace', '1969', ARRAY['Fiction', 'Sci-Fi']::TEXT[], 331, 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg', 11.50, 18.99, 20),
('9780441102679', 'Children of Dune', 'The next generation.', ARRAY['Frank Herbert']::TEXT[], 'Ace', '1976', ARRAY['Fiction', 'Sci-Fi']::TEXT[], 444, 'https://covers.openlibrary.org/b/isbn/9780441102679-L.jpg', 11.50, 18.99, 20),
('9780765326355', 'The Way of Kings', 'The first book of the Stormlight Archive.', ARRAY['Brandon Sanderson']::TEXT[], 'Tor Books', '2010', ARRAY['Fiction', 'Fantasy']::TEXT[], 1007, 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg', 22.00, 39.99, 15),
('9780765326362', 'Words of Radiance', 'The second book of the Stormlight Archive.', ARRAY['Brandon Sanderson']::TEXT[], 'Tor Books', '2014', ARRAY['Fiction', 'Fantasy']::TEXT[], 1087, 'https://covers.openlibrary.org/b/isbn/9780765326362-L.jpg', 22.00, 39.99, 15),
('9780765326379', 'Oathbringer', 'The third book of the Stormlight Archive.', ARRAY['Brandon Sanderson']::TEXT[], 'Tor Books', '2017', ARRAY['Fiction', 'Fantasy']::TEXT[], 1243, 'https://covers.openlibrary.org/b/isbn/9780765326379-L.jpg', 25.00, 44.99, 12),
('9780765326386', 'Rhythm of War', 'The fourth book of the Stormlight Archive.', ARRAY['Brandon Sanderson']::TEXT[], 'Tor Books', '2020', ARRAY['Fiction', 'Fantasy']::TEXT[], 1232, 'https://covers.openlibrary.org/b/isbn/9780765326386-L.jpg', 25.00, 44.99, 12),
('9780765377135', 'Mistborn: The Final Empire', 'The first Mistborn novel.', ARRAY['Brandon Sanderson']::TEXT[], 'Tor Books', '2006', ARRAY['Fiction', 'Fantasy']::TEXT[], 541, 'https://covers.openlibrary.org/b/isbn/9780765377135-L.jpg', 12.00, 19.99, 20),
('9780765316899', 'The Well of Ascension', 'The second Mistborn novel.', ARRAY['Brandon Sanderson']::TEXT[], 'Tor Books', '2007', ARRAY['Fiction', 'Fantasy']::TEXT[], 590, 'https://covers.openlibrary.org/b/isbn/9780765316899-L.jpg', 12.00, 19.99, 20),
('9780765316882', 'The Hero of Ages', 'The final book in the original trilogy.', ARRAY['Brandon Sanderson']::TEXT[], 'Tor Books', '2008', ARRAY['Fiction', 'Fantasy']::TEXT[], 572, 'https://covers.openlibrary.org/b/isbn/9780765316882-L.jpg', 12.00, 19.99, 20),
('9781101911761', 'Station Eleven', 'A story of art and memory in a post-pandemic world.', ARRAY['Emily St. John Mandel']::TEXT[], 'Vintage', '2014', ARRAY['Fiction', 'Dystopian']::TEXT[], 333, 'https://covers.openlibrary.org/b/isbn/9781101911761-L.jpg', 11.00, 17.99, 15),
('9780525536291', 'The Glass Hotel', 'A story of ghosts and greed.', ARRAY['Emily St. John Mandel']::TEXT[], 'Knopf', '2020', ARRAY['Fiction', 'Literary']::TEXT[], 300, 'https://covers.openlibrary.org/b/isbn/9780525536291-L.jpg', 13.50, 22.99, 12),
('9780593320440', 'Sea of Tranquility', 'A time-traveling mystery.', ARRAY['Emily St. John Mandel']::TEXT[], 'Knopf', '2022', ARRAY['Fiction', 'Literary']::TEXT[], 255, 'https://covers.openlibrary.org/b/isbn/9780593320440-L.jpg', 14.50, 24.99, 10),
('9780307278159', 'The Seven Husbands of Evelyn Hugo', 'A glamorous and heart-wrenching tale.', ARRAY['Taylor Jenkins Reid']::TEXT[], 'Washington Square Press', '2017', ARRAY['Fiction', 'Contemporary']::TEXT[], 385, 'https://covers.openlibrary.org/b/isbn/9780307278159-L.jpg', 12.50, 19.99, 25),
('9781501161933', 'Daisy Jones & The Six', 'The rise and fall of a fictional rock band.', ARRAY['Taylor Jenkins Reid']::TEXT[], 'Ballantine Books', '2019', ARRAY['Fiction', 'Contemporary']::TEXT[], 355, 'https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg', 13.00, 21.99, 20),
('9781524798659', 'Malibu Rising', 'A summer of secrets.', ARRAY['Taylor Jenkins Reid']::TEXT[], 'Ballantine Books', '2021', ARRAY['Fiction', 'Contemporary']::TEXT[], 369, 'https://covers.openlibrary.org/b/isbn/9781524798659-L.jpg', 13.50, 22.99, 18),
('9781524798680', 'Carrie Soto Is Back', 'A champion’s return.', ARRAY['Taylor Jenkins Reid']::TEXT[], 'Ballantine Books', '2022', ARRAY['Fiction', 'Contemporary']::TEXT[], 366, 'https://covers.openlibrary.org/b/isbn/9781524798680-L.jpg', 14.00, 24.99, 15),
('9780525559474', 'The Midnight Library', 'Between life and death there is a library.', ARRAY['Matt Haig']::TEXT[], 'Viking', '2020', ARRAY['Fiction', 'Fantasy']::TEXT[], 304, 'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg', 13.00, 21.99, 30),
('9781786892706', 'Reasons to Stay Alive', 'A moving look at mental health.', ARRAY['Matt Haig']::TEXT[], 'Canongate Books', '2015', ARRAY['Nonfiction', 'Memoir']::TEXT[], 264, 'https://covers.openlibrary.org/b/isbn/9781786892706-L.jpg', 10.00, 16.99, 12),
('9781786892737', 'Notes on a Nervous Planet', 'Living in a world that makes us anxious.', ARRAY['Matt Haig']::TEXT[], 'Canongate Books', '2018', ARRAY['Nonfiction', 'Self-Help']::TEXT[], 320, 'https://covers.openlibrary.org/b/isbn/9781786892737-L.jpg', 11.00, 17.99, 10),
('9780143111580', 'Thinking, Fast and Slow', 'The mechanics of decision making.', ARRAY['Daniel Kahneman']::TEXT[], 'Farrar, Straus and Giroux', '2011', ARRAY['Nonfiction', 'Psychology']::TEXT[], 499, 'https://covers.openlibrary.org/b/isbn/9780143111580-L.jpg', 14.50, 24.99, 8),
('9780062316097', 'Sapiens: A Brief History of Humankind', 'The story of our species.', ARRAY['Yuval Noah Harari']::TEXT[], 'Harper', '2011', ARRAY['Nonfiction', 'History']::TEXT[], 443, 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg', 16.00, 27.99, 20),
('9780062464316', 'Homo Deus: A Brief History of Tomorrow', 'The future of humankind.', ARRAY['Yuval Noah Harari']::TEXT[], 'Harper', '2015', ARRAY['Nonfiction', 'History']::TEXT[], 449, 'https://covers.openlibrary.org/b/isbn/9780062464316-L.jpg', 16.00, 27.99, 15),
('9780525150221', '21 Lessons for the 21st Century', 'Current issues facing humanity.', ARRAY['Yuval Noah Harari']::TEXT[], 'Spiegel & Grau', '2018', ARRAY['Nonfiction', 'History']::TEXT[], 372, 'https://covers.openlibrary.org/b/isbn/9780525150221-L.jpg', 15.00, 25.99, 12),
('9780345533486', 'Ready Player One', 'A virtual reality hunt.', ARRAY['Ernest Cline']::TEXT[], 'Crown', '2011', ARRAY['Fiction', 'Sci-Fi']::TEXT[], 374, 'https://covers.openlibrary.org/b/isbn/9780345533486-L.jpg', 12.00, 19.99, 20),
('9781524761332', 'Ready Player Two', 'The hunt continues.', ARRAY['Ernest Cline']::TEXT[], 'Ballantine Books', '2020', ARRAY['Fiction', 'Sci-Fi']::TEXT[], 366, 'https://covers.openlibrary.org/b/isbn/9781524761332-L.jpg', 14.00, 24.99, 15),
('9780812988406', 'Educated', 'A memoir of surviving a survivalist childhood.', ARRAY['Tara Westover']::TEXT[], 'Random House', '2018', ARRAY['Nonfiction', 'Memoir']::TEXT[], 335, 'https://covers.openlibrary.org/b/isbn/9780812988406-L.jpg', 14.00, 23.99, 25),
('9780525510314', 'Becoming', 'The memoir of the former First Lady.', ARRAY['Michelle Obama']::TEXT[], 'Crown', '2018', ARRAY['Nonfiction', 'Biography']::TEXT[], 426, 'https://covers.openlibrary.org/b/isbn/9780525510314-L.jpg', 18.00, 32.50, 30),
('9781524763138', 'A Promised Land', 'The presidential memoir of Barack Obama.', ARRAY['Barack Obama']::TEXT[], 'Crown', '2020', ARRAY['Nonfiction', 'Biography']::TEXT[], 768, 'https://covers.openlibrary.org/b/isbn/9781524763138-L.jpg', 25.00, 45.00, 20),
('9780735219090', 'Where the Crawdads Sing', 'A story of survival and murder in the marshes.', ARRAY['Delia Owens']::TEXT[], 'G.P. Putnam''s Sons', '2018', ARRAY['Fiction', 'Mystery']::TEXT[], 368, 'https://covers.openlibrary.org/b/isbn/9780735219090-L.jpg', 13.00, 21.99, 35),
('9780735224292', 'Little Fires Everywhere', 'Secrets and mothers in a planned community.', ARRAY['Celeste Ng']::TEXT[], 'Penguin Press', '2017', ARRAY['Fiction', 'Literary']::TEXT[], 338, 'https://covers.openlibrary.org/b/isbn/9780735224292-L.jpg', 12.00, 19.99, 15),
('9781594204517', 'Everything I Never Told You', 'The story of a family after a daughter’s death.', ARRAY['Celeste Ng']::TEXT[], 'Penguin Press', '2014', ARRAY['Fiction', 'Literary']::TEXT[], 292, 'https://covers.openlibrary.org/b/isbn/9781594204517-L.jpg', 11.50, 18.99, 12),
('9781984820464', 'Our Missing Hearts', 'A story of maternal love in a dystopian future.', ARRAY['Celeste Ng']::TEXT[], 'Penguin Press', '2022', ARRAY['Fiction', 'Dystopian']::TEXT[], 335, 'https://covers.openlibrary.org/b/isbn/9781984820464-L.jpg', 14.50, 24.99, 10),
('9780385547344', 'The Lincoln Highway', 'A journey across 1950s America.', ARRAY['Amor Towles']::TEXT[], 'Viking', '2021', ARRAY['Fiction', 'Historical']::TEXT[], 576, 'https://covers.openlibrary.org/b/isbn/9780385547344-L.jpg', 16.00, 27.99, 15),
('9780143130529', 'A Gentleman in Moscow', 'A count confined to a hotel after the revolution.', ARRAY['Amor Towles']::TEXT[], 'Viking', '2016', ARRAY['Fiction', 'Historical']::TEXT[], 462, 'https://covers.openlibrary.org/b/isbn/9780143130529-L.jpg', 13.00, 21.99, 20),
('9780143123255', 'Rules of Civility', 'A young woman’s rise in 1930s Manhattan.', ARRAY['Amor Towles']::TEXT[], 'Viking', '2011', ARRAY['Fiction', 'Historical']::TEXT[], 335, 'https://covers.openlibrary.org/b/isbn/9780143123255-L.jpg', 12.00, 19.99, 10),
('9780525427490', 'The Boys in the Boat', 'The true story of the 1936 Olympic crew team.', ARRAY['Daniel James Brown']::TEXT[], 'Viking', '2013', ARRAY['Nonfiction', 'History']::TEXT[], 404, 'https://covers.openlibrary.org/b/isbn/9780525427490-L.jpg', 13.50, 22.99, 15),
('9780385534246', 'The Wright Brothers', 'The story of the pioneers of flight.', ARRAY['David McCullough']::TEXT[], 'Simon & Schuster', '2015', ARRAY['Nonfiction', 'Biography']::TEXT[], 320, 'https://covers.openlibrary.org/b/isbn/9780385534246-L.jpg', 15.00, 25.99, 10),
('9780743224543', '1776', 'The pivotal year of the American Revolution.', ARRAY['David McCullough']::TEXT[], 'Simon & Schuster', '2005', ARRAY['Nonfiction', 'History']::TEXT[], 386, 'https://covers.openlibrary.org/b/isbn/9780743224543-L.jpg', 14.00, 23.99, 12),
('9780312612979', 'The Nightingale', 'A story of two sisters in occupied France.', ARRAY['Kristin Hannah']::TEXT[], 'St. Martin''s Press', '2015', ARRAY['Fiction', 'Historical']::TEXT[], 440, 'https://covers.openlibrary.org/b/isbn/9780312612979-L.jpg', 14.50, 24.99, 25),
('9781250178602', 'The Four Winds', 'A story of survival in the Dust Bowl.', ARRAY['Kristin Hannah']::TEXT[], 'St. Martin''s Press', '2021', ARRAY['Fiction', 'Historical']::TEXT[], 464, 'https://covers.openlibrary.org/b/isbn/9781250178602-L.jpg', 15.00, 26.99, 20),
('9781250178633', 'The Great Alone', 'A family seeking a new start in Alaska.', ARRAY['Kristin Hannah']::TEXT[], 'St. Martin''s Press', '2018', ARRAY['Fiction', 'Historical']::TEXT[], 448, 'https://covers.openlibrary.org/b/isbn/9781250178633-L.jpg', 14.00, 23.99, 18),
('9780525541905', 'The Book of Longings', 'A reimagining of the life of Jesus’ wife.', ARRAY['Sue Monk Kidd']::TEXT[], 'Viking', '2020', ARRAY['Fiction', 'Historical']::TEXT[], 416, 'https://covers.openlibrary.org/b/isbn/9780525541905-L.jpg', 14.00, 24.99, 10)
ON CONFLICT (isbn) DO NOTHING;
