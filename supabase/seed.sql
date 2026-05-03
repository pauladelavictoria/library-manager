-- Seed data generado desde Google Books API

-- Insertar Autores
INSERT INTO authors (name) VALUES ('Gerald Martin');
INSERT INTO authors (name) VALUES ('Jacques Joset');
INSERT INTO authors (name) VALUES ('Monica Brown');
INSERT INTO authors (name) VALUES ('Dagmar Ploetz');
INSERT INTO authors (name) VALUES ('Gabriel García Márquez');
INSERT INTO authors (name) VALUES ('Juan, Moreno Blanco');
INSERT INTO authors (name) VALUES ('Varios Autores');
INSERT INTO authors (name) VALUES ('Conrado Zuluaga');
INSERT INTO authors (name) VALUES ('Harold Alvarado Tenorio');
INSERT INTO authors (name) VALUES ('Alejandra Giovanna Amatto');
INSERT INTO authors (name) VALUES ('Orlando Araújo Fontalvo');
INSERT INTO authors (name) VALUES ('Otros');
INSERT INTO authors (name) VALUES ('Madeleine Jansen');
INSERT INTO authors (name) VALUES ('ResumenExpress,');
INSERT INTO authors (name) VALUES ('Charo Serrano Herrero');
INSERT INTO authors (name) VALUES ('Stephen M. Hart');
INSERT INTO authors (name) VALUES ('Álvaro Santana Acuña');
INSERT INTO authors (name) VALUES ('Mónica Brown');
INSERT INTO authors (name) VALUES ('Georgina Lázaro León');
INSERT INTO authors (name) VALUES ('Juan Moreno Blanco');
INSERT INTO authors (name) VALUES ('Mario Vargas Llosa');
INSERT INTO authors (name) VALUES ('Carlos Fuentes');
INSERT INTO authors (name) VALUES ('Julio Cortázar');
INSERT INTO authors (name) VALUES ('Stephen King');
INSERT INTO authors (name) VALUES ('Bev Vincent');
INSERT INTO authors (name) VALUES ('Philip L. Simpson');
INSERT INTO authors (name) VALUES ('Patrick McAleer');
INSERT INTO authors (name) VALUES ('Agatha Christie');
INSERT INTO authors (name) VALUES ('John Curran');
INSERT INTO authors (name) VALUES ('Matthew Townend');
INSERT INTO authors (name) VALUES ('José Antonio Forzán');
INSERT INTO authors (name) VALUES ('Rafael García Pavón');
INSERT INTO authors (name) VALUES ('J. R. R. Tolkien');
INSERT INTO authors (name) VALUES ('Christopher Tolkien');
INSERT INTO authors (name) VALUES ('Tom Shippey');
INSERT INTO authors (name) VALUES ('Corey Olsen');
INSERT INTO authors (name) VALUES ('Colin Duriez');
INSERT INTO authors (name) VALUES ('Humphrey Carpenter');
INSERT INTO authors (name) VALUES ('John Ronald Reuel Tolkien');
INSERT INTO authors (name) VALUES ('Wayne G Hammond');
INSERT INTO authors (name) VALUES ('Christina Scull');
INSERT INTO authors (name) VALUES ('Stanley P. Baldwin');
INSERT INTO authors (name) VALUES ('Vicente Cervera Salinas');
INSERT INTO authors (name) VALUES ('Sergio Missana');
INSERT INTO authors (name) VALUES ('Jorge Luis Borges');
INSERT INTO authors (name) VALUES ('Manuel Ferrer');
INSERT INTO authors (name) VALUES ('Rodrigo Quian Quiroga');
INSERT INTO authors (name) VALUES ('María Kodama');
INSERT INTO authors (name) VALUES ('Roberto Alifano');
INSERT INTO authors (name) VALUES ('Carlos Ruiz Zafón');

-- Insertar Categorías
INSERT INTO categories (name) VALUES ('Biography & Autobiography') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Literary Criticism') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Authors, Colombian') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Language Arts & Disciplines') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Literary Collections') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Fiction') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Foreign Language Study') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Education') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Juvenile Nonfiction') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Juvenile Fiction') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Ethics in literature') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Comics & Graphic Novels') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Baggins, Frodo (Fictitious character)') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Argentine poetry') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Science') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Bestiaries') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Poesía argentina') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('Authors, Argentine') ON CONFLICT (name) DO NOTHING;

-- Insertar Editoriales
INSERT INTO publishers (name) VALUES ('DEBATE') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Rodopi') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Alfaguara Infantil') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('EDAF') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('RANDOM HOUSE') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Editorial Unimagdalena') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Universidad del Valle') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('eLibros, Luna Libros') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Vintage Espanol') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('GRIN Verlag') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Universidad del Norte') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('ResumenExpress.com') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Reaktion Books') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Cuando Los Grandes Eran Pequeo') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('ALFAGUARA') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('PLAZA & JANÉS') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('DEBOLS!LLO') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('becker&mayer! books ISBN') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('DEBOLSILLO') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Bloomsbury Publishing PLC') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('SUMA') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('National Geographic Books') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('MB Cooltura') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Century Carroggio') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Booket Argentina') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Espasa') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Editorial Alfabeto') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Publicaciones Cruz O., S.A.') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Ediciones Minotauro') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('HarperCollins UK') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('HarperCollins') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Grupo Planeta Spain') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Ediciones Rialp, S.A.') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Planeta Publishing') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Minotauro') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Spark Notes') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('EDITUM') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Lom Ediciones') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('Tamesis') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('SUDAMERICANA') ON CONFLICT (name) DO NOTHING;
INSERT INTO publishers (name) VALUES ('LUMEN') ON CONFLICT (name) DO NOTHING;

-- Insertar Libros
INSERT INTO books (isbn, title, description, authors, publisher, published_date, categories, page_count, cover_url, cost_price, selling_price, stock_quantity) VALUES 
(
      '9788499920818',
      'Gabriel García Márquez',
      'La biografía definitiva de García Márquez, una obra extraordinaria fruto de 17 años de trabajo. «Todo escritor con principios debería tener un biógrafo inglés», dijo Gabriel García Márquez sobre este libro en una ocasión. Tras diecisiete años de trabajo, más de trescientas entrevistas y un primer borrador con más de tres mil páginas, Gerald Martin ha logrado estar a la altura de esa frase al escribir una biografía magistral, «tolerada» más que autorizada, y saludada por la crítica como la obra definitiva sobre el gran escritor colombiano, quizá el más influyente en lengua española de los últimos cincuenta años. Un libro que recorre la vida y la obra del escritor más fascinante del siglo XX. Desde los inicios en Aracataca y la fundamental relación con su abuelo, Nicolás Márquez, su infancia y juventud, los inicios como periodista entre Cartagena y Barranquilla, el descubrimiento de Europa, el regreso a América y el impacto de la revolución cubana, su consagración como escritor tras la publicación en 1967 de Cien años de soledad y el Nobel de Literatura en 1982, hasta la actualidad. Por sus páginas desfilan sus amistades políticas y literarias: Castro, González, Clinton, Cortázar, Mutis, Vargas Llosa, Balcells, y sus trayectos vitales: Colombia, Barcelona, México. En resumen, un acontecimiento editorial internacional. Reseñas: «Una obra monumental, precisa, atenta a los datos, pero también muy atmosférica y literaria.» Marta Caballero, El Cultural «Una biografía brillante.» Kirkus Reviews «Una crónica magistral y sensible, equilibrada y juiciosa pero también un emocionante tributo.» Times Literary Supplement',
      ARRAY['Gerald Martin']::TEXT[],
      'DEBATE',
      '2011-06-17',
      ARRAY['Biography & Autobiography']::TEXT[],
      745,
      'https://books.google.com/books/content?id=29cNR2fg1qMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.06,
      15.09,
      17
    ),
(
      '9062038360',
      'Gabriel García Márquez',
      'No detailed description available for "Gabriel García Márquez Coetáneo de la Eternidad".',
      ARRAY['Jacques Joset']::TEXT[],
      'Rodopi',
      '1984',
      ARRAY['Literary Criticism']::TEXT[],
      88,
      'https://books.google.com/books/content?id=Pp9dVVbIbH4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      13.88,
      20.82,
      20
    ),
(
      '1631130072',
      'Conoce a Gabriel Garcia Marquez',
      'A Gabriel García Márquez lo conocen y lo admiran en todos los rincones del planeta. Ha escrito más de treinta libros que se han traducido a muchos idiomas. Sus maravillosas historias, que están llenas de personajes y lugares mágicos, le hicieron merecedor del Premio Nobel de Literatura en 1982. ''Gabo'', como lo llaman cariñosamente, nació en Colombia y creció rodeado de historias. Algunas las contaban sus abuelos. Otras, las escuchaba en el pueblo. Y su loro, Lorenzo el Magnífico, le contó otras tantas...',
      ARRAY['Monica Brown']::TEXT[],
      'Alfaguara Infantil',
      '2014-05-20',
      ARRAY['Authors, Colombian']::TEXT[],
      NULL,
      'https://books.google.com/books/content?id=G6JxoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      11.12,
      16.68,
      7
    ),
(
      '8441414483',
      'Gabriel García Márquez',
      NULL,
      ARRAY['Dagmar Ploetz']::TEXT[],
      'EDAF',
      '2004-01-01',
      ARRAY['Biography & Autobiography']::TEXT[],
      204,
      'https://books.google.com/books/content?id=PtH5anmifdMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      14.33,
      21.50,
      14
    ),
(
      '9788439734871',
      'El escándalo del siglo',
      'Antología de la obra periodística de Gabriel García Márquez. Más de medio centenar de textos representativos de toda su trayectoria, seleccionados por Cristóbal Pera. Dejó muy claro Gabriel García Márquez que el periodismo siempre fue su principal pasión, la más perdurable y por la que quiso ser recordado: «No quiero que se me recuerde por Cien años de soledad, ni por el premio Nobel, sino por el periódico. [...] Nací periodista y hoy me siento más reportero que nunca. Lo llevo en la sangre, me tira». Esta antología pretende ser la muestra más representativa de la tensión narrativa entre periodismo y literatura que recorrió toda su trayectoria como reportero. Cubriendo cuatro décadas, este delicioso viaje a través de medio centenar de textos muestra como «el mejor oficio del mundo» está en el corazón de la obra del premio Nobel colombiano. Con edición y selección a cargo de Cristóbal Pera y prólogo de Jon Lee Anderson, este volumen contiene piezas tan indispensables como los reportajes escritos desde Roma sobre la muerte de una joven italiana, suceso que permitió al autor pintar un fresco incomparable de las élites políticas y artísticas del país, así como crónicas sobre la trata de blancas desde París hasta América Latina o apuntes sobre Fidel Castro o el papa Pío XII. Encontramos también fragmentos tempranos en los que aparecen por primera vez las familias Buendía y Aracataca, junto con artículos que contemplan la política, la sociedad y la cultura bajo la luz sólida, profunda y experimentada de ese gran contador de historias que siempre será maestro de periodistas. La crítica ha dicho... «Gabo era un gran periodista, pero un periodista también para la ficción. Fue el Pablo Picasso de la literatura del siglo XX. Su obra es un tesoro.» Juan Cruz «Todos sus actos indicaron que para él el periodismo no era un ganapán ni un oficio bastardo, sino una forma de la literatura a la que valía la pena entregarle la vocación y la vida. [...] Fue uno de los pocos autores latinoamericanos de su generación[...] que creyó que el periodismo bien hecho podía llegar a ser un arte.» Leila Guerriero «Gabriel García Márquez tiene un lugar especial en el corazón de los periodistas. Como Charles Dickens, Mark Twain y Ernest Hemingway, García Márquez, titán de la literatura del siglo XX, pulió su capacidad literaria como reportero antes de convertirse en un célebre novelista.» Newsweek «García Márquez aprendió del periodismo el arte de contar historias, demostrándose a sí mismo que era un extraordinario maestro del ritmo, la sorpresa y la estructura.» The Guardian «[García Márquez] era un periodista endiablado a bordo de libros, vivencias e insomnios.[...] Sus trabajos forman parte de la genealogía de lo mejor de la profesión. No solo por el alzado literario,[...] también por el escalpelo con el que entra a los protagonistasde la aventura a contar, esa condición implacable de fisionomista que confirma aquello de que la mitad de un reportaje está en el ambiente que lo envuelve.» El Mundo «Decir que Gabriel García Márquez fue periodista y escritor podría hacer pensar que ejerció ambas ocupaciones en forma consecutiva. Narrador nato, toda su vida fue las dos cosas.» La Nación «Tan sencillo, tan directo, tan concreto, tan detallista... Tan genial.» Natalia Blanco, Diario16 «Engancha al lector desde el golpe inicial.» Winston Manrique, El País «La muestra más representativa de la tensión narrativa entre periodismo y literatura.» El Cultural',
      ARRAY['Gabriel García Márquez']::TEXT[],
      'RANDOM HOUSE',
      '2018-09-06',
      ARRAY['Language Arts & Disciplines']::TEXT[],
      364,
      'https://books.google.com/books/content?id=6rxsDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      11.69,
      17.54,
      9
    ),
(
      '9789587463118',
      'Gabriel García Márquez. Nuevas lecturas',
      'El presente libro misceláneo compuesto de ensayos de varios autores, inéditos o publicados en años recientes, propone al lector claves contemporáneas de lectura de la obra garciamarquiana. Estas claves se alejan de la valoración exótica o exotista del escritor colombiano tan frecuente en el siglo XX y se relacionan más de cerca con la diversidad de contextos culturales, históricos, literarios, políticos o escriturales cuyo fragor acompañó o motivó esta escritura. Algunos de estos trabajos proyectan sobre Cien años de soledad, El otoño del patriarca, El amor en los tiempos del cólera y Crónica de una muerte anunciada nuevas perspectivas críticas suscitadas en la segunda década del siglo XXI. Por otro lado, también se encontrarán en este libro balances generales, lecturas transversales y ejercicios comparatistas que invitan a la relectura y revaloración de la obra de Gabriel García Márquez.',
      ARRAY['Juan, Moreno Blanco']::TEXT[],
      'Editorial Unimagdalena',
      '2020-09-30',
      ARRAY['Biography & Autobiography']::TEXT[],
      349,
      'https://books.google.com/books/content?id=CEcgEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.54,
      11.31,
      18
    ),
(
      '9589825141',
      'Gabo periodista',
      NULL,
      ARRAY['Gabriel García Márquez', 'Gerald Martin']::TEXT[],
      NULL,
      '2012*',
      NULL,
      507,
      NULL,
      14.43,
      21.64,
      13
    ),
(
      '9788439730552',
      'De Europa y América',
      'En esta tercera entrega de la obra periodística del autor encontramos un período de intensas experiencias políticas, de dinamismo ideológico, de enriquecimiento estilístico. De Europa y América (1955-1960) cierra el período más activo de García Márquez en el campo del periodismo: período de intensas experiencias políticas, de dinamismo ideológico, de enriquecimiento estilístico. De hecho, estaba todo dispuesto para el esfuerzo creativo que inmediatamente había de traducirse en las páginas de La mala hora (1962) y, un lustro más tarde, en las de su obra maestra, Cien años de soledad. En las crónicas y reportajes que García Márquez enviaba allende el Atlántico, desde Ginebra, Roma, Venecia, Viena, París, el lector perspicaz hallará innumerables presagios de la gran obra literaria que incubaba el consagrado narrador colombiano.',
      ARRAY['Gabriel García Márquez']::TEXT[],
      'RANDOM HOUSE',
      '2015-05-07',
      ARRAY['Literary Criticism']::TEXT[],
      909,
      'https://books.google.com/books/content?id=EH8oCAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.94,
      11.91,
      13
    ),
(
      '9789585070042',
      'Gabriel García Márquez a 40 años del Premio Nobel',
      'La entrega del Premio Nobel de Literatura de la Academia Sueca a Gabriel García Márquez en 1982 trajo para Colombia un momento de gran significación; 40 años después este libro vuelve sobre las resonancias e irradiaciones de ese acontecimiento mayor de la memoria y cultura colombianas. Los diferentes trabajos que lo componen, escritos por suecos y colombianos, abordan no sólo antecedentes y aristas de ese momento sino también temas de la narrativa del escritor colombiano desde claves de lectura contemporáneas. El libro está dividido en dos partes. La primera, "García Márquez-Suecia", contiene testimonios, análisis y perspectivas que permiten aquilatar y resignificar la atribución del Nobel al escritor colombiano; la segunda, "En coordenadas garciamarquianas", nos brinda análisis de textos particulares de la obra del colombiano en época en que decae la perspectiva magicorrealista para dar lugar a análisis que se preocupan más por los contextos literarios, filosóficos, históricos y político-culturales cuyo conocimiento permite nuevas valoraciones de esta obra literaria leída en todo el mundo.',
      ARRAY['Varios Autores']::TEXT[],
      'Universidad del Valle',
      '2023-08-15',
      ARRAY['Literary Collections']::TEXT[],
      735,
      'https://books.google.com/books/content?id=4yj5EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      11.02,
      16.53,
      19
    ),
(
      '9789588887241',
      'Gabriel García Márquez. No moriré del todo',
      'Sólo quedan de García Márquez sus palabras. Una docena de novelas, un volumen con todos sus cuentos, varios reportajes inolvidables, otro libro con sus discursos, centenares de entrevistas y reportajes, cinco volúmenes con sus columnas periodísticas –según algunos testimonios, una novela inédita– y en todos ellos hay episodios luminosos que le brindan, incluso al más desprevenido de sus lectores, muchos momentos de satisfacción. La única memoria perdurable y el mejor, más sentido y más valioso homenaje –a alguien que durante toda su vida repitió con firmeza “escribo para que mis amigos me quieran más”– es la lectura de sus obras.',
      ARRAY['Conrado Zuluaga']::TEXT[],
      'eLibros, Luna Libros',
      '2017-04-14',
      ARRAY['Biography & Autobiography']::TEXT[],
      173,
      'https://books.google.com/books/content?id=0M6uDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      9.68,
      14.52,
      24
    ),
(
      '9788439729808',
      'La hojarasca',
      'En La hojarasca nació Macondo, ese poblachón cercano a la costa atlántica colombiana que ya se ha convertido en una de los grandes mitos de la literatura universal. En Macondo transcurre la historia de un entierro imposible. Ha muerto un personaje extraño, un antiguo médico odiado por el pueblo, y un viejo coronel retirado, para cumplir una promesa, se ha empeñado en enterrarle ante la oposición de todo el pueblo y sus autoridades. Como en una tragedia griega -el libro lleva como lema una cita de Antígona que recuerda la prohibición de enterrar el cuerpo del Polinices-, el viejo coronel, su hija y su nieto van a cumplir la ominosa tarea. La acción, compuesta por la descripción de los preparativos para el entierro -una media hora- y los recuerdos de un cuarto de siglo de la historia de Macondo, de 1905 a 1928, se narra a través de los pensamientos de estos tres personajes. «De pronto como si un remolino hubiera echado raíces en el centro del pueblo, llegó la compañía bananera perseguida por la hojarasca. Era una hojarasca revuelta, alborotada, formada por los desperdicios humanos y materiales de los otros pueblos: rastrojos de una guerra civil que cada vez parecía más remota e inverosímil. La hojarasca era implacable». La crítica ha dicho: «Cuando de la barbarie no quede ni sombra de recuerdo, las obras de García Márquez seguirán iluminando el corazón de multitudes con su destello inagotable». Ricardo Moreno, El País «Para García Márquez, el mundo esconde misterios con los que podemos convivir y que incluso son necesarios, pero también milagros que no podemos entender, que hablan en nombre de fuerzas desconocidas por los hombres. La hojarasca aúna el estilo temprano y tardío de García Márquez. El primero merece nuestro respeto; el segundo nuestra celebración». Peter S. Prescott, Newsweek «La textura es de prosa poética, y la intención una restitución de creencia religiosa. Pero el sentimiento que permanece es como un hechizo, una sensación de haber resistido al terror y la magia». Paul Theroux, Chicago Tribune «García Márquez tiene una imaginación asombrosamente fuerte, y escribe con la serenidad de un hombre que sabe exactamente las maravillas que puede llevar a cabo. En la tierra de Márquez suceden cosas extrañas. Como ocurre con Emerson, Poe o Hawthorne, cada frase rompe el silencio de un vasto vacío, la famosa "soledad" del Nuevo Mundo que representa la desesperación inconsciente de sus personajes es la marca personal del genio garciamarquiano». Alfred Kazin, The New York Times Book Review Sobre la obra de García Márquez: «El imaginario del novelista se ha convertido en un lugar mítico de las letras universales». La Razón «Un genio». Julio Cortázar «El Quijote de nuestro tiempo». Pablo Neruda «García Márquez es ese ejemplo realmente espléndido de la literatura que gusta mucho a mucha gente, lo cual es muy poco frecuente». Juan García Hortelano «El mayor juglar de nuestro tiempo, el hombre que por lo menos nos ha hecho menos infelices, o quizá rotundamente más felices en estos tan infelices tiempos que nos ha tocado habitar». Rafael Conte «García Márquez aprendió del periodismo el arte de contar historias, demostrándose a sí mismo que era un extraordinario maestro del ritmo, la sorpresa y la estructura». The Guardian',
      ARRAY['Gabriel García Márquez']::TEXT[],
      'RANDOM HOUSE',
      '2015-02-05',
      ARRAY['Fiction']::TEXT[],
      106,
      'https://books.google.com/books/content?id=6TFjBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      5.44,
      8.16,
      14
    ),
(
      '9780307474728',
      'Cien años de soledad / One Hundred Years of Solitude',
      '"La aventura fabulosa de la familia Buendía-Iguarán, con sus milagros, fantasías, obsesiones, tragedias, incestos, adulterios, rebeldías, descubrimientos y condenas, representaba al mismo tiempo el mito y la historia, la tragedia y el amor del mundo entero. El personaje principal es Macondo, el pueblo mismo, que sobrevive al olvido por cien años de fracasos personales y acontecimientos fantásticos, para finalmente desaparecer sin rastro alguno, al igual que toda su historia" --from Amazon.com.',
      ARRAY['Gabriel García Márquez']::TEXT[],
      'Vintage Espanol',
      '2009-09-22',
      ARRAY['Fiction']::TEXT[],
      498,
      'https://books.google.com/books/content?id=7lj5EHcChqYC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      7.86,
      11.79,
      17
    ),
(
      '9780525566755',
      'Gabriel García Márquez: Todos los cuentos / All the Stories',
      'Una colección excepcional que reúne todos los cuentos de Gabriel García Márquez, ganador del Premio Nobel. El lector encontrará los primeros relatos que García Márquez publicó en Ojos de perro azul, incluyendo el “Monólogo de Isabel viendo llover en Macondo”, primera referencia al lugar imaginario que se convertiría en el espacio literario más reconocido de nuestro tiempo tras la publicación de Cien años de soledad. A partir de entonces siguieron una serie de historias que muestran a García Márquez en total control de su talento narrativo: Los funerales de la Mamá Grande, donde se cuenta el majestuoso funeral de la auténtica soberana de Macondo, y La increíble y triste historia de la cándida Eréndira y su abuela desalmada. Finalmente, se incluye la última colección de relatos que publicó, Doce cuentos peregrinos, donde el autor lleva a los lectores a Europa para contarnos historias del destino de latinoamericanos emigrados, de su melancolía y su tenacidad. Son cuarenta y un relatos imprescindibles que recorren la trayectoria del autor de Cien años de soledad y que constituyen un impresionante legado para la literatura universal. ENGLISH DESCRIPTION An exceptional collection that brings together all of the Nobel Laureate, Gabriel García Márquez’, stories. In this volume readers will find the first stories that García Márquez published in Ojos de Perro Azul / Eyes of a Blue Dog, including the “Monólogo de Isabel viendo llover en Macondo” / “Monologue of Isabel Watching It Rain in Macondo”, which is the first reference to the imaginary place that would become the most recognized literary space of our time after Cien años de soledad / One Hundred Years of Solitude was published. From then on, a series of stories followed that show García Márquez in total control of his narrative talent: “Los funerales de la Mamá Grande” / “Big Mama''s Funeral”, where the majestic funeral of the true sovereign of Macondo is told, and “La increíble y triste historia de la cándida Eréndira y su abuela desalmada” / “The Incredible and Sad Tale of Innocent Eréndira and Her Heartless Grandmother”. Finally, the latest collection of stories that he published is also included here, “Doce cuentos peregrinos” / “Strange Pilgrims”, where he takes readers to Europe to tell stories of the fate of Latin American emigrants, their sadness, and tenacity. There are forty-one essential stories that run the entire trajectory of the author of Cien años de soledad / One Hundred Years of Solitude and one that constitutes an impressive legacy for world literature.',
      ARRAY['Gabriel García Márquez']::TEXT[],
      'Vintage Espanol',
      '2020-06-02',
      ARRAY['Fiction']::TEXT[],
      514,
      'https://books.google.com/books/content?id=s4zzDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      10.79,
      16.18,
      21
    ),
(
      '9789587652710',
      'Gabriel García Márquez',
      'A más de dos años de la desaparición de Gabriel García Márquez los trabajos aquí reunidos presentan lecturas diversas de periodistas, profesores y escritores alrededor de la persona y la obra de más relieve en la cultura colombiana, Si el título de este libro une el nombre del escritor a la conjunción de literatura y memoria es porque el hijo mayor del telegrafista de Aracataca nos enseñó a contemplar en sus tramas, metáforas e imágenes esa reunión de realidades e irrealidades que es nuestra historia.',
      ARRAY['Harold Alvarado Tenorio', 'Alejandra Giovanna Amatto', 'Orlando Araújo Fontalvo', 'Otros']::TEXT[],
      'Universidad del Valle',
      '2023-05-10',
      ARRAY['Literary Criticism']::TEXT[],
      532,
      'https://books.google.com/books/content?id=qJfREQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.13,
      10.70,
      19
    ),
(
      '9783656691136',
      '"Cien años de soledad" de Gabriel García Márquez. Análisis de los elementos mágicos',
      'Seminar paper del año 2013 en eltema Romanística - Estudios españoles, Nota: 1,0, Justus-Liebig-Universität Gießen (Institut für Romanistik), Materia: Gabriel García Márquez: Cien años de soledad, Idioma: Español, Resumen: La epopeya familiar Cien años de soledad escrita por el galardonado premio nobel Gabriel García Márquez es una de las obras más importantes y revolucionarias de la literatura latinoamericana. Su novela, publicada en 1967, es considerada como prototipo del ‘realismo mágico’, que une lo mágico con lo real. Este trabajo está dedicado al tema del ‘realismo mágico’ y al análisis de sus elementos que aparecen en la obra Cien años de soledad. Se empezará con la historia y el desarollo del término en Europa y Latinoamérica. Después intentaremos acercarnos a una definición del mismo. Al mismo tiempo, se nombrarán los representantes más importantes y sus enfoques. La parte principal del trabajo consistirá en la descripción y la interpretación de aspectos, que se pueden diferenciar entre ‘lo mágico’, ‘lo milagroso’ y ‘lo fantástico’. Esa ‘magia’ concierne a seres humanos, animales, objetos, así como fenómenos abstractos que se refieren al tiempo, fijando la atención en lo que se llama ‘la peste de insomnio’ como enfermedad ficticia. Para finalizar, dedicaremos un tiempo a la relación entre la vida de Gabriel García Márquez y su narración. El objetivo de este trabajo no es presentar el tema del ‘realismo mágico’ en su totalidad, se trata más bien de enseñar la realización de este concepto en Cien años de soledad. Para ponerlo concretamente en práctica, se van a presentar muchos ejemplos de la literatura primaria, apoyado por los tratados de autores como Scheffel y Qual.',
      ARRAY['Madeleine Jansen']::TEXT[],
      'GRIN Verlag',
      '2014-07-07',
      ARRAY['Foreign Language Study']::TEXT[],
      21,
      'https://books.google.com/books/content?id=Pfr2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      8.78,
      13.17,
      14
    ),
(
      '9789587410822',
      'Gabriel García Márquez, el Caribe y los espejismos de la modernidad',
      'Gabriel García Márquez es el más importante escritor colombiano de todos los tiempos; uno de los más grandes de la lengua española; un referente obligado de las letras nacionales; el padre a quien no hay escritor bisoño que no quiera decapitar; quien mejor entendió la sentencia clarividente de Julio Cortázar: “Vamos a ser escritores, y todo lo que no sea escribir es secundario, así tengamos que morirnos de hambre”. El escritor que se puso el overol y se encerró en México a forjar una de las más portentosas manifestaciones de la inteligencia del Caribe. Por ello, resulta tan válido este nuevo acercamiento, esta relectura a su novela Cien años de soledad a partir de las herramientas conceptuales de la crítica moderna. Esta obra rastrea la génesis, profundiza en el análisis y en la valoración de la propuesta estética e ideológica cifrada en la textura significativa de Cien años de soledad.',
      ARRAY['Orlando Araújo Fontalvo']::TEXT[],
      'Universidad del Norte',
      '2010',
      ARRAY['Literary Criticism']::TEXT[],
      123,
      'https://books.google.com/books/content?id=gmdJDFxqs68C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      6.20,
      9.30,
      20
    ),
(
      '9782806289322',
      'Crónica de una muerte anunciada de Gabriel García Márquez (Guía de lectura)',
      'ResumenExpress.com presenta y analiza en esta guía de lectura Crónica de una muerte anunciada, una novela corta del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982. La historia, inspirada en hechos reales, narra con precisión de crónica periodística los momentos previos al asesinato de Santiago Nasar, una muerte anunciada y aun así inevitable. Una obra magistral elevada a leyenda en los anales de la literatura universal. ¡Ya no tienes que leer y resumir todo el libro, nosotros lo hemos hecho por ti! Esta guía incluye: • Un resumen completo del libro • Un estudio de los personajes • Las claves de lectura • Pistas para la reflexión ¿Por qué elegir ResumenExpress.com? Para aprender de forma rápida. Porque nuestras publicaciones están escritas con un estilo claro y conciso que te ayudará a ganar tiempo y a entender las obras sin esfuerzo. Disponibles en formato impreso y digital, te acompañarán en tu aventura literaria. Toma una dosis de literatura acelerada con ResumenExpress.com',
      ARRAY['ResumenExpress,']::TEXT[],
      'ResumenExpress.com',
      '2016-12-07',
      ARRAY['Education']::TEXT[],
      28,
      'https://books.google.com/books/content?id=K7i2DQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      11.36,
      17.04,
      20
    ),
(
      '8420524255',
      'Gabriel Garcia Marquez, Cronica Deuna Muerte Anunciada',
      NULL,
      ARRAY['Charo Serrano Herrero']::TEXT[],
      NULL,
      '1995',
      NULL,
      36,
      NULL,
      8.45,
      12.67,
      8
    ),
(
      '9781780232423',
      'Gabriel García Márquez',
      '“Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.” Thus begins Nobel Prize winner Gabriel García Márquez’s One Hundred Years of Solitude, one of the twentieth century’s most lauded works of fiction. In Gabriel García Márquez, literary scholar Stephen M. Hart provides a succinct yet thorough look into García Márquez’s life and the political struggles of Latin America that have influenced his work, from Love in the Time of Cholera to Memories of My Melancholy Whores. By interviewing García Márquez’s family in Cuba, Hart was able to gain a unique perspective on his use of “creative false memory,” providing new insight into the magical realism that dominates García Márquez’s oeuvre. Using these interviews and his original research, Hart defines five ingredients that are critical to García Márquez’s work: magical realism, a shortened and broken portrayal of time, punchy one-liners, dark and absurd humor, and political allegory. These elements, as described by Hart, illuminate the extraordinary allure of García Márquez’s work and provide fascinating insight into his approach to writing. Hart also explores the divisions between García Márquez’s everyday life and his life as a writer, and the connection in his work between family history and national history. Gabriel García Márquez presents an original portrait of this well-renowned writer and is a must-read for fans of his work as well as those interested in magical realism, Latin American fiction, and modern literature.',
      ARRAY['Stephen M. Hart']::TEXT[],
      'Reaktion Books',
      '2013-06-01',
      ARRAY['Biography & Autobiography']::TEXT[],
      226,
      'https://books.google.com/books/content?id=TVnqAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      13.44,
      20.16,
      23
    ),
(
      '6079839091',
      'Gabriel García Márquez',
      NULL,
      ARRAY['Álvaro Santana Acuña']::TEXT[],
      NULL,
      '2021',
      ARRAY['Authors, Colombian']::TEXT[],
      331,
      NULL,
      7.38,
      11.07,
      20
    ),
(
      '9587433653',
      'Conoce a Gabriel García Márquez',
      NULL,
      ARRAY['Mónica Brown']::TEXT[],
      NULL,
      '2014',
      NULL,
      NULL,
      NULL,
      7.55,
      11.32,
      19
    ),
(
      '9789587652727',
      'Gabriel García Márquez',
      'A más de dos años de la desaparición de Gabriel García Márquez los trabajos aquí reunidos presentan lecturas diversas de periodistas, profesores y escritores alrededor de la persona y la obra de más relieve en la cultura colombiana, Si el título de este libro une el nombre del escritor a la conjunción de literatura y memoria es porque el hijo mayor del telegrafista de Aracataca nos enseñó a contemplar en sus tramas, metáforas e imágenes esa reunión de realidades e irrealidades que es nuestra historia.',
      ARRAY['Harold Alvarado Tenorio', 'Alejandra Giovanna Amatto', 'Orlando Araújo Fontalvo', 'Otros']::TEXT[],
      'Universidad del Valle',
      '2023-05-10',
      ARRAY['Literary Criticism']::TEXT[],
      640,
      'https://books.google.com/books/content?id=TnC-EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.36,
      15.54,
      16
    ),
(
      '1933032855',
      'Gabriel García Márquez',
      'Biographical poem about the childhood of Gabriel García Márquez, the Columbian author.',
      ARRAY['Georgina Lázaro León']::TEXT[],
      'Cuando Los Grandes Eran Pequeo',
      '2014',
      ARRAY['Authors, Colombian']::TEXT[],
      NULL,
      'https://books.google.com/books/content?id=RGtOnwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      6.04,
      9.06,
      16
    ),
(
      '9786287500488',
      'Gabriel García Márquez. Literatura y memoria',
      'A más de dos años de la desaparición de Gabriel García Márquez los trabajos aquí reunidos presentan lecturas diversas de periodistas, profesores y escritores alrededor de la persona y la obra de más relieve en la cultura colombiana. Si el título de este libro une el nombre del escritor a la conjunción de literatura y memoria es porque el hijo mayor del telegrafista de Aracataca nos enseñó a contemplar en sus tramas, metáforas e imágenes esa reunión de realidades e irrealidades que es nuestra historia. El mundo que puso su obra ante nosotros se parece mucho a nuestro mundo; la Colombia que él vio entró en nuestra mirada.',
      ARRAY['Juan Moreno Blanco']::TEXT[],
      'Universidad del Valle',
      '2021-03-10',
      ARRAY['Literary Criticism']::TEXT[],
      639,
      'https://books.google.com/books/content?id=ve3IEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      5.24,
      7.86,
      14
    ),
(
      '9788420460895',
      'Las cartas del Boom',
      'EL BOOM EN PRIMERA PERSONA (DEL PLURAL) Cuatro de los más grandes autores contemporáneos en español a través de su correspondencia compartida. «La obra de García Márquez es incomprensible sin la de Cortázar, y la de Cortázar es incomprensible sin la de Vargas Llosa, y se establece toda una red que corresponde a algo muy real. Porque yo sé que cada uno de nosotros es muy consciente de lo que están haciendo los demás». Carlos Fuentes, 1968 «Este libro reúne, por primera vez, la correspondencia entre los cuatro principales novelistas del Boom latinoamericano: Cortázar, Fuentes, García Márquez y Vargas Llosa. Los dos últimos recibieron el Premio Nobel, y los dos primeros lo merecían; a nadie hubiera sorprendido que lo obtuvieran. Esta conversación entre cuatro amigos brillantes y exitosos nos ofrece un acceso sin precedentes a sus relaciones personales y colectivas, con todos sus encuentros y desencuentros, y nos abre una ventana privilegiada a la literatura y la política latinoamericanas, especialmente durante un periodo crucial de su historia moderna, entre 1959 y 1975. » Las cartas del Boom narra el momento de máximo auge de este cuarteto, en el que los creadores parecían empezar a escribir menos solos para tocar en conjunto como parte de una misma literatura, y ahonda en ese reconocimiento y esa regeneración de un pasado en común. »Encontrar cuatro grandes escritores en un contexto histórico casi sin paralelo, comunicándose durante varios años para dialogar sobre novela, literatura, historia latinoamericana, sus propias biografías y la dinámica de sus ideas dentro de ese contexto, es absolutamente único. Las páginas de este libro cuentan esa historia». Los editores La crítica ha dicho... «Una recopilación sin desperdicio de la correspondencia que se cruzaron los cuatro novelistas más notables de esa generación, a quienes unió la extraña circunstancia de ser al mismo tiempo grandes escritores y grandes amigos. [...] Gozo ininterrumpido». Juan Gabriel Vásquez, El País «Un libro gozoso, [...] luminoso, imperecedero como la historia que representa». Juan Cruz, El Periódico «Un libro histórico». Ascensión Rivas, El Cultural «Un jugoso epistolario». Ricardo Cayuela Gally, El Mundo «Una de las mejores novelas del boom». J. A. Masoliver Ródenas, La Vanguardia «Las cuatro grandes vedettes, los cuatro fantásticos, los cuatro mosqueteros, los Beatles de las letras latinoamericanas: [...] el cuarteto fue el que de forma más directa cocinó y emplató el fenómeno. [...] Un documento histórico de primera magnitud sobre las entrañas del Boom». Mauricio Bach, The Objective «La lectura de esas misivas ágiles, billetes teñidos del entusiasmo vital del que sabe que está haciendo algo grande, permiten al lector levantar el velo de la personalidad de cada uno de sus remitentes, que hasta ahora sólo intuíamos en la filigrana de los personajes de sus obras. [...] Este magnífico libro los recuerda como las leyendas vivas que son». Javier Puga Llopis, El Periódico de España «Debemos sentirnos agradecidos por que nuestros amigos Julio, Gabo, Carlos y Mario, que también los fueron entre ellos durante décadas, nos ofrezcan estos destellos de genialidad artísticas en forma de misivas». Natalio Blanco, Diario16 «Un acceso sin precedentes a sus relaciones personales y colectivas, con todos sus encuentros y desencuentros, y nos abre una ventana privilegiada a la literatura». Zenda',
      ARRAY['Mario Vargas Llosa', 'Gabriel García Márquez', 'Carlos Fuentes', 'Julio Cortázar']::TEXT[],
      'ALFAGUARA',
      '2023-06-15',
      ARRAY['Literary Collections']::TEXT[],
      1192,
      'https://books.google.com/books/content?id=LRHAEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      11.87,
      17.80,
      24
    ),
(
      '9788401027161',
      'Después',
      'En ocasiones, para crecer debes vencer a tus demonios. EL REY DEL TERROR REGRESA CON UNA NUEVA E INOLVIDABLE NOVELA. NÚMERO 1 EN LA LISTA DE MÁS VENDIDOS DEL NEW YORK TIMES Jamie Conklin, el único hijo de una madre soltera, solo quiere tener una infancia normal. Sin embargo, nació con una habilidad sobrenatural que su madre le insta a mantener en secreto y que le permite ver aquello que nadie puede y enterarse de lo que el resto del mundo ignora. Cuando una inspectora del Departamento de Policía de Nueva York le obliga a evitar el último atentado de un asesino que amenaza con seguir atacando incluso desde la tumba, Jamie no tardará en descubrir que el precio que debe pagar por su poder tal vez es demasiado alto. Después es Stephen King en estado puro, una novela inquietante y emotiva sobre la inocencia perdida y las pruebas que hay que superar para diferenciar el bien del mal. Deudora del gran clásico del autor It (Eso), Después es un relato poderoso, terrorífico e inolvidable sobre la necesidad de plantarle cara a la maldad en todas sus formas. La crítica ha dicho... «Es como si todo su universo estuviera en un solo libro, solo que este es más ligero que los anteriores... Me parece perfecto para cuando tienes ganas de leer algo sencillo antes de ir a la cama. Él mismo lo dice: la mejor hora para leer su trabajo es justo cuando cae el sol.» MARIANA GÁLVEZ, El Cultural «Mitad historia de detectives, mitad thriller... Es emocionante y auténtica.» The New York Times « Después es un ejemplo más del poder de Stephen King para contar una historia sencilla a la par que irresistible.» New York Journal of Books «Sangriento e inquietante, este thriller tiene bastantes secretos y sorpresas para hacer que los lectores no suelten la lnovela hasta el final. Es todo un regalo para los fans del autor.» Publishers Weekly «Si tienes ganas de mezclar escalofríos y emociones fuertes pero no dispones de tiempo para leer un clásico de King, con este libro lo conseguirás antes de irte a la cama. Aunque seguramente no podrás dormir.» Kirkus «Una lectura entretenida y ligera que cuenta con la magistral habilidad que ha convertido a King en una leyenda literaria.» AARP Magazine «Una prueba más que añadir a la lista de proezas narrativas de este autor.» Bookbub «Un nuevo clásico para los fans de Stephen King.» Associated Press «La escritura de King en Después es limpia, directa y evocadora, como siempre lo ha sido. El argumento, basado en un crimen, es impelente, y algunas frases quitan el aliento... Estáis en las manos de un narrador magistral.» Washington Post «Un relato muy satisfactorio sobre tanto los demonios que podemos ver como aquellos que acechan en la oscuridad.» Foreword Reviews',
      ARRAY['Stephen King']::TEXT[],
      'PLAZA & JANÉS',
      '2021-06-10',
      ARRAY['Fiction']::TEXT[],
      267,
      'https://books.google.com/books/content?id=kKIsEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      5.01,
      7.51,
      7
    ),
(
      '9788401354083',
      'Todo oscuro, sin estrellas',
      'Cuatro venganzas. Cuatro castigos. Cuatro novelas cortas sumamente sorprendentes y enormemente impactantes. No las podrás olvidar. «Creo que existe otro hombre dentro de cada hombre, un extraño...» son palabras de la confesión que escribe Wilfred Leland James en «1922», el primer relato de este cuarteto hipnotizador y profundamente oscuro. El ser desconocido que James lleva dentro se despierta cuando su esposa Arlette le anuncia que piensa vender el terreno que acaba de heredar y que va a trasladarse a la ciudad. Sus palabras le empujan hacia el asesinato y la locura. En «Camionero grande» Tess, una escritora de novelas simpáticas de intriga, se encuentra con un hombre gigantesco cuando vuelve a casa por una carretera rural después de dar una charla en un club de lectura. Violada y abandonada tras ser dada por muerta, Tess planea su venganza y para llevarla a cabo tendrá que sacar de sí misma un lado totalmente desconocido. «Una extensión justa», el relato más corto, es el más malvado y el más divertido. Harry Streeter hace un pacto con el diablo, quien le quitará no solamente su cáncer mortal, sino también todos los rencores que había sentido en su vida. Y finalmente, en «Un buen matrimonio» conocemos a Darcy Anderson quien, un día en que su marido está fuera por trabajo, va a buscar pilas al garaje y descubre una caja que él tenía allí escondida. Su contenido es tan horrendo como el ser desconocido que hay dentro de su marido. En un solo instante acabarán felices años de matrimonio. La crítica ha dicho... «¿Todo oscuro? ¿Sin estrellas? Mentira. Porque en estos cuatro relatos hay siempre una luz que ilumina las salpicaduras de sangre.» ABC « Todo oscuro, sin estrellas es una colección de relatos extraordinaria, terrorífica, sin piedad. El autor está en el cénit de su poder creativo.» The Telegraph «Un libro que te obliga a seguir leyendo. King domina tanto la novela corta como la novela muy larga.» The New York Times',
      ARRAY['Stephen King']::TEXT[],
      'DEBOLS!LLO',
      '2012-10-24',
      ARRAY['Fiction']::TEXT[],
      441,
      'https://books.google.com/books/content?id=zXpwl-eknlsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.01,
      15.02,
      13
    ),
(
      '9788490326138',
      'Las dos después de medianoche',
      'Miedo multiplicado por dos es igual a terror absoluto. Atado a un asiento de avión en un vuelo más allá del infierno. Atrapado en las profundidades de la peor pesadilla de un escritor. Simplemente, estás en las manos de Stephen King: te dejará tieso con un extraordinario doblete de novelas, garantizando el paro cardíaco a... las dos después de medianoche. La crítica ha dicho... «Cualquiera de las dos bastaría a un escritor normal para dar por buena la producción del año. Pero estas novelas cortas son más que una simple y buena cosecha: son de esas historias que no te permiten apartar la vista ni impedir que se te abrase la imaginación.» Playboy',
      ARRAY['Stephen King']::TEXT[],
      'DEBOLS!LLO',
      '2013-05-23',
      ARRAY['Fiction']::TEXT[],
      454,
      'https://books.google.com/books/content?id=erdIwfoezboC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      12.03,
      18.04,
      5
    ),
(
      '9780760376829',
      'Stephen King',
      'Take an intimate tour through the life and works of Stephen King, made vivid with rare photos and ephemera from King’s personal collection. Even if you are a die-hard fan, you will find something new in this beautifully packaged Stephen King reference that you will return to again and again. Timed to celebrate Stephen King’s 75th birthday on September 21, 2022, Stephen King: A Complete Exploration of His Work, Life, and Influences reveals the inspiration behind the prolific author’s brilliant works of horror through a combination of photos and documents from King’s archives and an engaging account of the stories behind how his novels, novellas, short stories, and adaptations came to be. It might sound like a tall tale that Stephen King once met a bartender named Grady in an empty hotel in Colorado, or that the celebrated author helped his young daughter bury her cat in a nearby “pets sematary” after it was killed on a busy roadway. In this book, discover how King drew on these and more real personal experiences and mundane life events, then employed his extraordinary imagination to twist them into something horrific. From impoverished university student to struggling schoolteacher to one of the best-selling—and most recognizable—authors of all time, this engrossing book reveals the evolution and influences of Stephen King’s body of work over his nearly 50-year career, and how the themes of his writing reflect the changing times and events within his life. An expansion of Stephen King expert Bev Vincent’s The Stephen King Illustrated Companion, this fully revised, redesigned, and updated book includes: A review of King’s complete body of work, including Fairy Tale, published in September 2022. A wealth of rare memorabilia from King’s own collection, including personal and professional correspondences, handwritten manuscript pages, book covers, movie stills, and never-before-seen excerpts from one of his poems and an unpublished short story. Interludes on specific topics such as real-life settings that inspired King’s writing, the editor who discovered him, his life as a Boston Red Sox fan, and the many awards and honors he has received. Insightful quotes from King from interviews over the decades. Celebrate the beloved King of Horror with this informational and entertaining look inside King’s most iconic titles and the culture they have created.',
      ARRAY['Bev Vincent']::TEXT[],
      'becker&mayer! books ISBN',
      '2022-09-13',
      ARRAY['Biography & Autobiography']::TEXT[],
      243,
      'https://books.google.com/books/content?id=giKIEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      9.91,
      14.87,
      9
    ),
(
      '9788490326114',
      'Las cuatro estaciones I',
      'Con estos dos relatos Stephen King accede a los niveles más profundos -y más inquietantes- de la mente humana. «Esperanza, primavera eterna»: a los veinte años le internaron en prisión, y ahora se encarga de conseguir a los otros internos todo lo que le soliciten, sea lo que sea. También es capaz de concebir el plan más increíble para lograr escapar, aunque tenga que recurrir a la mismísima Rita Hayworth... En este relató se basó Frank Darabont para su famosa película Cadena perpetua. «Verano de corrupción»: un niño descubre que un vecino es un conocido nazi y usa la información para, con refinada perversidad, abusar del anciano y conseguir sus «satánicos» objetos. Bryan Singer adaptó esta novela corta de King para crear el guión de la conocida película Verano de corrupción.',
      ARRAY['Stephen King']::TEXT[],
      'DEBOLS!LLO',
      '2013-05-23',
      ARRAY['Fiction']::TEXT[],
      328,
      'https://books.google.com/books/content?id=_kEf0pKJIX4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      9.78,
      14.67,
      21
    ),
(
      '9788401024764',
      'La sangre manda',
      'Cuatro novelas cortas de Stephen King sobre las fuerzas ocultas que nos acechan. Esta colección demuestra el incomparable talento, la imaginación y la diversidad de registros de este legendario narrador. La nueva película de «El teléfono del señor Harrigan», ya disponible en Netflix. Cuanto más cruenta y violenta es una noticia, más llama la atención: «La sangre manda». Así reza la máxima periodística que hará que Holly Gibney, la detective a la que Bill Hodges legó su agencia Finders Keepers, y que ya apareció en la trilogía «Bill Hodges» y en El visitante, se interese por la matanza en el instituto Albert Macready y acabe enganchada a las noticias. Esta vez deberá luchar contra lo que más teme... sola. En «El teléfono del señor Harrigan» una amistad entre dos personas de distintas edades perdura de manera más que inquietante. «La vida de Chuck» nos ofrece una hermosa reflexión acerca de la existencia de cada uno de nosotros. Y en «La rata» un escritor desesperado se enfrenta al lado más oscuro de la ambición. Cuatro relatos en los que Stephen King sorprende nuevamente a los lectores y los conduce a lugares intrigantes y sobrecogedores. La crítica ha dicho... «En La sangre manda King vuelve a hacer de las suyas desde su trono con una cierta comodidad: la de quien se sabe autorizado porque se ha ganado ese derecho. Hasta la próxima, Su Majestad.» Rodrigo Fresán, ABC «King logra como siempre que devores cuatro alucinantes historias y te transporta de modo magistral a su mundo propio.» Albert Espinosa, El Periódico de Catalunya «Es el Corín Tellado de las historias de terror, el Lope de Vega de los relatos de escalofríos. Si un escritor pudiera ser valorado por el efecto psicológico y sensorial que produce en el lector, Stpehen King habría obtenido el premio Nobel del horror sobrenatural hace mucho tiempo.» Toni Montesinos, Qué Leer « La sangre manda ofrece un espejo absurdo y fantasmagórico del mundo contemporáneo... El mundo, desde hace años, se ha vuelto muy Stephen King.» El Mundo «Puede incluso que, para cuando termine de leer este artículo, el Rey del Terror, el más prolífico y torrencial de los novelistas americanos, tenga ya una o dos novelas nuevas en imprenta y media docena de adaptaciones en camino.» ABC « La sangre manda ofrece cuatro novelas cortas que demuestran que Stephen King es un maestro del ritmo narrativo.» La Razón «Lo que más terror le da a Stephen King es que la vida real, cada día, se va pareciendo más y más a sus obras.» Radio nacional «Hay quien pensará que dar con el libro adecuado debería ser el último de nuestros problemas durante una pandemia, pero ¿cómo vamos a soportar si no las noches en vela? (...) Stephen King es muy buena compañía en la oscuridad.» The New York Times «Las cuatro historias inéditas que componen esta edición nos muestran a King, el maestro del terror, en todo su esplendor.» Publishers Weekly «El King de siempre: un placer para sus incontables fans y un buen punto de partida si todavía no lo conoces.» Kirkus Reviews «Este recopilatorio de novelas cortas te hace reflexionar, es terrorífico y, a menudo, absolutamente cautivador.» Booklist «Disfrutamos del gran escritor de terror en estado puro en estas cuatro novelas cortas llenas de suspense y, sorprendentemente, de pequeñas dosis de ternura.» The Observer',
      ARRAY['Stephen King']::TEXT[],
      'PLAZA & JANÉS',
      '2020-07-02',
      ARRAY['Fiction']::TEXT[],
      506,
      'https://books.google.com/books/content?id=l2XlDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.90,
      16.35,
      15
    ),
(
      '9788490326121',
      'Las cuatro estaciones II',
      'Dos terroríficas historias que confirman a Stephen King como un maestro indiscutido en reflejar esa barrera invisible donde se traspasan los límites de la razón, la moral o el bien para dejar paso al instinto más primitivo, donde el hombre da rienda suelta a las pasiones más inconfesables e inquietantes, pero no por ello menos reales. «El otoño de la inocencia»: un escritor vuelve a recorrer el camino que atravesó con tres amigos durante su adolescencia para descubrir el cadáver de otro niño, en la representación ritual del pasaje de la juventud a la madurez. En esta novela corta está basada la película Cuenta conmigo del director Rob Reiner. «El método de respiración»: la inquietante historia de una paciente, contada por su doctor, cuyo espíritu indomable mantiene vivo a su bebé bajo las circunstancias más extraordinarias... Corren rumores de que este relato también será llevado al cine próximamente.',
      ARRAY['Stephen King']::TEXT[],
      'DEBOLS!LLO',
      '2013-05-23',
      ARRAY['Fiction']::TEXT[],
      243,
      'https://books.google.com/books/content?id=Z13q6LIk0uoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      11.29,
      16.93,
      20
    ),
(
      '9788499891125',
      'El ciclo del hombre lobo',
      'Una escalofriante revisión del mito del hombre lobo por el rey de la literatura de terror, Stephen King. El terror empezó en enero, con la luna llena... El primer grito fue el de un ferroviario aislado por la nieve, cuando sintió unos colmillos desgarrando su garganta. Al mes siguiente se oyó un grito de agonía proferido por una mujer a quien atacaban en su habitación. Cada vez que la luna llena brilla en la aislada y solitaria ciudad de Tarker''s Mills, se producen escenas de increíble horror. Nadie sabe quién será la próxima víctima. Pero sí hay una certeza... ...cuando la luna se muestra en todo su esplendor, un terror paralizante recorre Tarker''s Mills. En el viento se oyen gruñidos que parecen palabras humanas. Y por todas partes aparecen las huellas de un monstruo insaciable...',
      ARRAY['Stephen King']::TEXT[],
      'DEBOLS!LLO',
      '2011-04-01',
      ARRAY['Fiction']::TEXT[],
      104,
      'https://books.google.com/books/content?id=wvU9kjQxUF8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.41,
      11.12,
      24
    ),
(
      '8499089100',
      'Después del anochecer',
      NULL,
      ARRAY['Stephen King']::TEXT[],
      'DEBOLSILLO',
      '2011-07-01',
      ARRAY['Juvenile Nonfiction']::TEXT[],
      448,
      'https://books.google.com/books/content?id=zy4mqAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      11.46,
      17.19,
      6
    ),
(
      '9788401342462',
      'Doctor Sueño',
      'Una novela que entusiasmará a los millones de lectores de El resplandor y que encantará a todos aquellos que conozcan a Danny Torrance por primera vez. Stephen King vuelve al mundo de El resplandor, una de sus novelas más queridas y emblemáticas. Ahora Danny Torrance, aquel niño aterrorizado del Hotel Overlook, es un adulto alcohólico y sin residencia fija que va de ciudad en ciudad atormentado por sus visiones y por los fantasmas de su infancia, que ha aprendido a controlar pero no a eliminar de su mente. Un día se siente atraído por una ciudad de New Hampshire, donde encontrará trabajo en una residencia de ancianos y donde se apuntará a las reuniones de Alcohólicos Anónimos. En ese lugar le llega la visión de Abra Stone, una niña que necesita su ayuda. La persigue una tribu de seres paranormales que vive del resplandor de los niños especiales. Parecen personas mayores y totalmente normales que viajan por el país en sus autocaravanas, pero su misión es capturar, torturar y consumir a estos niños. Se alimentan de ellos para vivir y el resplandor de Abra tiene tanta fuerza que los podría mantener vivos durante mucho tiempo. Danny sabe que sin su ayuda Abra nunca conseguirá escapar de ellos; juntos emprenderán una lucha épica, una batalla sangrienta entre el Bien y el Mal, para intentar salvarla a ella y a los demás niños que sacrifican. Una novela icónica en la obra de Stephen King. La crítica ha dicho... «Una lectura apasionante e inquietante que ofrece una conclusión satisfactoria a la historia de Danny Torrance.» Publishers Weekly',
      ARRAY['Stephen King']::TEXT[],
      'PLAZA & JANÉS',
      '2013-11-07',
      ARRAY['Fiction']::TEXT[],
      662,
      'https://books.google.com/books/content?id=sUftAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      9.54,
      14.31,
      19
    ),
(
      '9788466363549',
      'El misterio de Salem''s Lot',
      'Salem''s Lot es un pueblo tranquilo donde nunca pasa nada. O quizás esto son solo apariencias, pues lo cierto es que sí se están sucediendo diversos hechos misteriosos, incluso escalofriantes... Veinte años atrás, por una apuesta infantil, Ben Mears entró en la casa de los Marsten. Y lo que vio entonces aún recorre sus pesadillas. Ahora, como escritor consagrado, vuelve a Salem''s Lot para exorcizar sus fantasmas. Salem''s Lot es un pueblo tranquilo y adormilado donde nunca pasa nada..., excepto la antigua tragedia de la casa de los Marsten. Y el perro muerto colgado de la verja del cementerio. Y el misterioso hombre que se instaló en la casa de los Marsten. Y los niños que desaparecen, los animales que mueren desangrados... Y la espantosa presencia de Ellos, quienesquiera que sean Ellos. Sobre el Rey del Terror: «Yo le daría el Premio Nobel a Stephen King». Mariana Enriquez, autora de Nuestra parte de noche «Un maestro de la narración». Los Angeles Times «[Stephen King es] el hombre que inspira más terror del planeta». USA Today «Stephen King es indiscutiblemente uno de los mejores narradores del siglo, y un maestro a la hora de retratar los horrores que habitan bajo la superficie de lo que parece la vida normal». Daily Mail',
      ARRAY['Stephen King']::TEXT[],
      'DEBOLS!LLO',
      '2022-04-28',
      ARRAY['Fiction']::TEXT[],
      601,
      'https://books.google.com/books/content?id=Q6NhEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.02,
      15.03,
      6
    ),
(
      '9781442244917',
      'Stephen King''s Contemporary Classics',
      'Many readers know Stephen King for his early works of horror, from his fiction debut Carrie to his blockbuster novels The Shining, The Stand, and Misery, among others. While he continues to be a best-selling author, King’s more recent fiction has not received the kind of critical attention that his books from the 1970s and 1980s enjoyed. Recent novels like Duma Key and 1/22/63 have been marginalized and, arguably, cast aside as anomalies within the author’s extensive canon. In Stephen King’s Contemporary Classics: Reflections on the Modern Master of Horror, Philip L. Simpson and Patrick McAleer present a collection of essays that analyze, assess, and critique King’s post-1995 compositions. Purposefully side-stepping studies of earlier work, these essays are arranged into three main parts: the first section examines five King novels published between 2009 and 2013, offering genuinely fresh scholarship on King; the second part looks at the development of King’s distinct brand of horror; the third section departs from probing the content of King’s writing and instead focuses on King’s process. By concentrating on King’s most recent writings, this collection offers provocative insights into the author’s work, featuring essays on Dr. Sleep, Duma Key, The Girl Who Loved Tom Gordon, Joyland, Under the Dome, and others. As such, Stephen King’s Contemporary Classics will appeal to general fans of the author’s work as well as scholars of Stephen King and modern literature.',
      ARRAY['Philip L. Simpson', 'Patrick McAleer']::TEXT[],
      'Bloomsbury Publishing PLC',
      '2014-11-13',
      ARRAY['Literary Criticism']::TEXT[],
      243,
      'https://books.google.com/books/content?id=iKuDBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      5.03,
      7.54,
      17
    ),
(
      '8497930142',
      'El fugitivo',
      'In an America of the future, the nation''s most popular television game show offers a life-or-death contest in which contestants must evade the lethal hunters to win a one-billion-dollar jackpot.',
      ARRAY['Stephen King']::TEXT[],
      'DEBOLSILLO',
      '2003',
      ARRAY['Fiction']::TEXT[],
      304,
      'https://books.google.com/books/content?id=tzClSQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      10.15,
      15.23,
      6
    ),
(
      '9788401354151',
      'El juego de Gerald',
      'Una de las novelas más angustiosas y claustrofóbicas del maestro del terror. En una cabaña aislada, desnuda y esposada a la cabecera de la cama, Jessie asiste inerte al macabro desenlace del juego erótico de Gerald, el hombre con quien ha convivido durante veinte años y que ahora está tendido en el suelo junto al lecho, muerto. Sola, sin poder liberarse, acuciada por el hambre y la sed y asediada por los fantasmas del pasado, Jessie se enfrenta al desafío de sobrevivir a la situación, mientras va adquiriendo conciencia de que la realidad es aún más pavorosa que la peor de sus pesadillas. La crítica ha dicho... «Uno de sus mejores libros.» USA Today «Espeluznante terror psicológico.» The New York Times «Una trama tan astuta que nos retiene, nos absorbe hasta la última página.» Newsweek',
      ARRAY['Stephen King']::TEXT[],
      'DEBOLS!LLO',
      '2012-10-24',
      ARRAY['Fiction']::TEXT[],
      479,
      'https://books.google.com/books/content?id=7GZg4NvqfXIC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      14.76,
      22.14,
      19
    ),
(
      '9788491293767',
      'Elevación',
      'King vuelve a Castle Rock con un mensaje para nuestros tiempos. «La prueba de que un maestro aún puede elevar más su leyenda.» USA Today El cuerpo de Scott Carey sufre un extraño fenómeno: pierde peso sin parar pero no se vuelve más delgado, su báscula le dice que cada día es un poco más ligero, sin importar si lleva o no ropa o cómo de pesada sea esta. Castle Rock es una ciudad pequeña en la que las noticias vuelan y Scott no quiere ser sometido a pruebas y experimentos, así que solo confía su secreto a su amigo el doctor Ellis. Sin embargo, el misterio de su insólita enfermedad causará efectos inesperados en la convivencia de la pequeña ciudad y sacará a la luz lo mejor de la gente que le rodea. Elevación es una historia fascinante y conmovedora y un antídoto contra nuestra cultura individualista. La crítica ha dicho... «Una historia de misterio, pero muy diferente a las habituales de King.» Zenda «El autor propone una emocionante novela corta en la que la falta de gravedad que sufre su protagonista es inversamente proporcional a la gravedad de la pregunta que se plantea: ¿Qué hacer cuando sucede lo inevitable?» Expansión «Un libro atípico, en una edición especial con ilustraciones, que resulta tan emotivo como provocador.» Todo Literatura «King narra una hermosa historia de amistad, respeto, solidaridad y tolerancia.» La opinión de Málaga «Escrita en el característico estilo translúcido de King y ambientada en una de sus localizaciones marca de la casa, esta historia atípicamente luminosa es un atrevido llamamiento a elevarnos por encima de nuestras diferencias... Mágico, oportuno, encantador y, sin embargo, provocador.» Booklist « Stephen King sigue teniendo el poder de sorprender a sus amados "lectores constantes"... Un narrador aún en el mejor momento de su carrera.» Associated Press En los blogs... «Es un cuento muy especial con un mensaje en el que todos deberíamos pensar.» Vacaciones en Plutón «Una historia profunda y sentimental con un poderoso mensaje final. No os decepcionará.» El cuervo de alas rotas « Un rayo de luz que emerge en la sociedad en la que vivimos, tan egoísta e individualista. Una novela excepcionalmente alegre y emotiva que nos descubre otras facetas del maestro King.» Negra y mortal',
      ARRAY['Stephen King']::TEXT[],
      'SUMA',
      '2019-11-07',
      ARRAY['Fiction']::TEXT[],
      131,
      'https://books.google.com/books/content?id=JeevDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      11.28,
      16.92,
      7
    ),
(
      '9788401354052',
      'Maleficio',
      'Una obra escalofriante que hará estremecerse a los más doctos en la literatura de terror del maestro Stephen King. Como buen americano, Billy Halleck es un hombre a la vez favorecido y perjudicado por la buena vida estadounidense: por un lado posee una buena casa, una familia feliz y una exitosa carrera como abogado; pero por el otro padece sobrepeso (le sobran más de 20 quilos) y su doctor no deja de recordarle que debería controlarlo si no quiere acabar con un ataque al corazón. Un mal día, debido a un accidente por conducción temeraria, Billy acaba con la vida de una gitana que estaba cruzando la calle. El anciano padre de la fallecida decide vengarse: sorprende a Billy a la salida de los juzgados y, acariciándole la cara, pronuncia las palabras «más delgado». Tras seis semanas y cuarenta quilos menos, Billy Halleck se convierte en un desecho humano. En el colmo de la desesperación, intenta encontrar una solución jugando con las fuerzas de la vida y de la muerte... La crítica ha dicho... «Maleficio amenaza el ánimo del lector hasta la última página.» Publishers Weekly',
      ARRAY['Stephen King']::TEXT[],
      'DEBOLS!LLO',
      '2012-10-24',
      ARRAY['Fiction']::TEXT[],
      408,
      'https://books.google.com/books/content?id=XqXPTD1-GcwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      8.54,
      12.81,
      6
    ),
(
      '9781644734704',
      'Después / Later',
      'En ocasiones, para crecer debes vencer a tus demonios. EL REY DEL TERROR REGRESA CON UNA NUEVA E INOLVIDABLE NOVELA. NÚMERO 1 EN LA LISTA DE MÁS VENDIDOS DEL NEW YORK TIMES Jamie Conklin, el único hijo de una madre soltera, solo quiere tener una infancia normal. Sin embargo, nació con una habilidad sobrenatural que su madre le insta a mantener en secreto y que le permite ver aquello que nadie puede y enterarse de lo que el resto del mundo ignora. Cuando una inspectora del Departamento de Policía de Nueva York le obliga a evitar el último atentado de un asesino que amenaza con seguir atacando incluso desde la tumba, Jamie no tardará en descubrir que el precio que debe pagar por su poder tal vez es demasiado alto. Después es Stephen King en estado puro, una novela inquietante y emotiva sobre la inocencia perdida y las pruebas que hay que superar para diferenciar el bien del mal. Deudora del gran clásico del autor It (Eso), Después es un relato poderoso, terrorífico e inolvidable sobre la necesidad de plantarle cara a la maldad en todas sus formas. ENGLISH DESCRIPTION “Part detective tale, part thriller…touching and genuine.” —The New York Times #1 bestselling author Stephen King returns with a brand-new novel about the secrets we keep buried and the cost of unearthing them. #1 NEW YORK TIMES BESTSELLER THE SUNDAY TIMES BESTSELLER SOMETIMES GROWING UP MEANS FACING YOUR DEMONS The son of a struggling single mother, Jamie Conklin just wants an ordinary childhood. But Jamie is no ordinary child. Born with an unnatural ability his mom urges him to keep secret, Jamie can see what no one else can see and learn what no one else can learn. But the cost of using this ability is higher than Jamie can imagine – as he discovers when an NYPD detective draws him into the pursuit of a killer who has threatened to strike from beyond the grave. LATER is Stephen King at his finest, a terrifying and touching story of innocence lost and the trials that test our sense of right and wrong. With echoes of King’s classic novel It, LATER is a powerful, haunting, unforgettable exploration of what it takes to stand up to evil in all the faces it wears.',
      ARRAY['Stephen King']::TEXT[],
      'National Geographic Books',
      '2021-09-21',
      ARRAY['Fiction']::TEXT[],
      NULL,
      'https://books.google.com/books/content?id=RKmQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      10.82,
      16.23,
      5
    ),
(
      '9780593311585',
      'La Cúpula / Under the Dome',
      'Una historia apocalíptica e hipnótica. Es una soleada mañana de otoño en la pequeña ciudad de Chester’s Mill, Claudette Sanders disfruta de su clase de vuelo y Dale Barbara, hace autostop en las afueras. Ninguno de los dos llegará a su destino. De la nada ha caído sobre la ciudad una barrera invisible como una burbuja cristalina inquebrantable. Al descender, ha cortado por la mitad a una marmota y ha amputado la mano a un jardinero. El avión que pilotaba Claudette ha chocado contra la cúpula y se ha precipitado al suelo envuelto en llamas. Dale Barbara, veterano de la guerra de Irak, debe regresar ahora a Chester’s Mill, el lugar que tanto deseaba abandonar. El ejército pone a Dale al cargo de la situación pero Big Jim Rennie, el hombre que tiene un pie en todos los negocios sucios de la ciudad, no está de acuerdo; la cúpula podría ser la respuesta a sus plegarias. A medida que la comida, la electricidad y el agua escasean, los niños comienzan a tener premoniciones escalofriantes. El tiempo se acaba para aquellos que viven bajo la cúpula. ¿Podrán averiguar qué ha creado tan terrorífica prisión antes de que sea demasiado tarde? ENGLISH DESCRIPTION An apocalyptic and hypnotic story. One sunny autumn morning, in the small town of Chester’s Mill, Claudette Sanders enjoys her flying lesson, and Dale Barbara hitchhikes just outside of town. None of them will reach their destination. Out of nowhere, an invisible barrier descend son the city like a crystalline and unbreakable bubble. While coming down, it cuts a groundhog in half and amputates a gardener’s hand. The plain Claudette was flying crashes into the dome and plummets to the ground engulfed in flames. Dale Barbara, Iraq war veteran, must return now to Chester’s Mill, the place he so wished to leave. The military puts Dale in charge of the situation, but Big Jim Rennie, the man with one foot in every dirty business in town, does not agree. The dome might just be the answer to his prayers. As food, power, and water become scarce, children start having chilling premonitions. Time is running out for those under the dome. Will they be able to figure out what created such terrifying prison before it’s too late?',
      ARRAY['Stephen King']::TEXT[],
      'National Geographic Books',
      '2022-01-18',
      ARRAY['Fiction']::TEXT[],
      NULL,
      'https://books.google.com/books/content?id=izKOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      13.65,
      20.48,
      7
    ),
(
      '9788499899275',
      'El resplandor',
      'Un clásico imprescindible del mejor novelista de terror. REDRUM Esa es la palabra que Danny había visto en el espejo. Y, aunque no sabía leer, entendió que era un mensaje de horror. Danny tenía cinco años, y a esa edad poco niños saben que los espejos invierten las imágenes y menos aún saben diferenciar entre realidad y fantasía. Pero Danny tenía pruebas de que sus fantasías relacionadas con el resplandor del espejo acabarían cumpliéndose: REDRUM... MURDER, asesinato. Pero su padre necesitaba aquel trabajo en el hotel. Danny sabía que su madre pensaba en el divorcio y que su padre se obsesionaba con algo muy malo, tan malo como la muerte y el suicidio. Sí, su padre necesitaba aceptar la propuesta de cuidar de aquel hotel de lujo de más de cien habitaciones, aislado por la nieve durante seis meses. Hasta el deshielo iban a estar solos. ¿Solos?... La crítica ha dicho... «El rey del terror.» El País «Terrorífica... ofrece horrores a un ritmo intenso e infatigable.» The New York Times',
      ARRAY['Stephen King']::TEXT[],
      'DEBOLS!LLO',
      '2012-05-10',
      ARRAY['Fiction']::TEXT[],
      644,
      'https://books.google.com/books/content?id=-chAB7NNa-QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      12.76,
      19.14,
      15
    ),
(
      '8499082351',
      'La Torre Oscura 3 - Traición',
      NULL,
      ARRAY['Stephen King']::TEXT[],
      'DEBOLSILLO',
      '2010-04',
      ARRAY['Juvenile Fiction']::TEXT[],
      160,
      'https://books.google.com/books/content?id=ncLOcQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      6.98,
      10.47,
      22
    ),
(
      '9789877448085',
      'Problema en el mar',
      'Poirot viaja en un crucero por el Mediterráneo. Cuando la mayoría de los pasajeros desembarca en Alejandría, la millonaria señora Clapperton aparece muerta en su camarote, aparentemente apuñalada por uno de los mercaderes nativos. Aunque nadie simpatizaba con la señora, el único con un verdadero motivo es su marido, pero tiene una sólida coartada. Poirot utilizará su método y muy pronto descubrirá al asesino.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2023-03-31',
      ARRAY['Fiction']::TEXT[],
      46,
      'https://books.google.com/books/content?id=pG-2EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      13.36,
      20.04,
      11
    ),
(
      '9789877445947',
      'La dama del velo',
      'Poirot se siente frustrado porque lleva varios meses sin resolver casos importantes, pero de una manera curiosa, una hermosa mujer se presenta y le pide ayuda. Necesita recuperar una carta que escribió durante su juventud y alguien está utilizando para chantajearla. Su próximo matrimonio peligra. Poirot se apiada de ella y termina desatando un mecanismo de relojería que lo colocará por primera vez del otro lado de la ley.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2021-03-28',
      ARRAY['Fiction']::TEXT[],
      18,
      'https://books.google.com/books/content?id=w_-GEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      9.87,
      14.80,
      8
    ),
(
      '9788472546776',
      'Coartada perfecta',
      'Dos muertes narradas al inicio de la obra acaban con la tranquilidad de King''s Abbot, una pequeña y sosegada ciudad británica. Mrs. Ferrars asesina a su brutal marido y es víctima de extorsión hasta que ella, sin poder aguantar más, se suicida. El hombre a quien amaba, Roger Ackroyd, recibe una carta que da pistas sobre nombre del extorsionador, quien le llevó a tal fatídico desenlace. Pero antes incluso de conocer la identidad del personaje, algo terrible sucede a Roger Ackroyd. El detective Hercules Poirot, recién retirado a King''s Abbott, es llamado para tratar de resolver el complejo caso, cuyo fin será de lo más sorprendente e inesperado. Se trata, según la crítica, de una de las mejores obras de Agatha Christie. En 2013, El asesinato de Roger Ackroyd fue elegida como la mejor novela de crimen de todos los tiempos por 600 miembros de la Asociación de Escritores de Crimen.',
      ARRAY['Agatha Christie']::TEXT[],
      'Century Carroggio',
      '2023-01-30',
      ARRAY['Fiction']::TEXT[],
      170,
      'https://books.google.com/books/content?id=0e2zEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      12.07,
      18.11,
      19
    ),
(
      '9789877447910',
      'El misterio de Cornish',
      'La señora Pengelley visita a Hércules Poirot porque sospecha que su marido la está envenenando. Cuando el detective Belga llega a la casa para investigar el caso, al día siguiente, descubre que es tarde porque la señora Pengelley ha muerto. Poirot se siente tan responsable por no haber dado crédito a las palabras de la señora Pengelley que llegará hasta las últimas consecuencias a la hora de resolver este intrincado caso.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2023-03-01',
      ARRAY['Fiction']::TEXT[],
      41,
      'https://books.google.com/books/content?id=sHqwEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.98,
      11.97,
      21
    ),
(
      '9789877447521',
      'El expreso de Plymouth',
      'Flossie Halliday, hija de un magnate americano del acero, es encontrada muerta en un tren con rumbo a Plymouth. Su padre, que conoce a Hércules Poirot, lo contrata para que descubra al asesino.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2022-12-01',
      ARRAY['Fiction']::TEXT[],
      41,
      'https://books.google.com/books/content?id=01eeEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      6.68,
      10.02,
      7
    ),
(
      '9789877448559',
      'Accidente',
      'El inspector Evans se sorprende al descubrir que la señora Merrowdene, casada con uno de sus vecinos, es la misma que ha sido absuelta, muchos años antes, en un juicio por el asesinato de su anterior esposo. Evans tiene la certeza de que un asesino raramente se siente satisfecho con un solo crimen. Si se le da tiempo y nadie sospecha, cometerá otro. ¿Podrá el inspector salvar a su vecino en peligro, o se trata de la simple fantasía de un viejo policía retirado?',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2023-08-29',
      ARRAY['Fiction']::TEXT[],
      34,
      'https://books.google.com/books/content?id=5bPTEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      8.79,
      13.18,
      8
    ),
(
      '9789875808997',
      'Asesinato en el Orient Express',
      'El Orient Express parte una vez más hacia los exóticos paisajes que jalonan su ruta de Estambul a Calais. Sin embargo, en esta ocasión el viaje no transcurrirá con la placidez de costumbre: el tren quedará bloqueado por la nieve y aparecerá el cadáver de un pasajero asesinado. ¿Quién puede ser el asesino de entre todos los viajeros? ¿La princesa rusa?, ¿uno de los nobles húngaros?, ¿el vendedor de la Ford?, ¿el ama de casa norteamericana? ¿O quizás alguien del servicio? Por suerte, Poirot también se halla allí y, gracias a sus células grises, logrará armar un laborioso rompecabezas que arroje luz a este complicado caso.',
      ARRAY['Agatha Christie']::TEXT[],
      'Booket Argentina',
      '2018-01-01',
      ARRAY['Fiction']::TEXT[],
      231,
      'https://books.google.com/books/content?id=2oxDDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.36,
      11.04,
      11
    ),
(
      '9789877448320',
      'La chica del tren',
      'George Rowland, un joven a quien su tío acaba de despedir del negocio familiar, viaja en tren para alejarse de Londres. Cuando una hermosa chica irrumpe en su compartimento, suplicando frenéticamente que la esconda, termina envuelto en un inesperado misterio relacionado con la gran Duquesa de Catonia.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2023-05-30',
      ARRAY['Fiction']::TEXT[],
      56,
      'https://books.google.com/books/content?id=iMnBEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      9.32,
      13.98,
      5
    ),
(
      '9789877449457',
      'La Dama de Compañía',
      'Amy Durrant muere ahogada mientras nadaba en compañía de su empleadora, la señora Burton, durante sus vacaciones en las islas Canarias. Un mes más tarde, la propia señora se suicida adentrándose en el mar. Agatha Christie plantea un interesante misterio que Miss Marple resolverá demostrando de qué modo curioso las apariencias engañan.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2024-07-26',
      ARRAY['Fiction']::TEXT[],
      48,
      'https://books.google.com/books/content?id=kT4yEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      9.72,
      14.58,
      11
    ),
(
      '9789877448719',
      'La bola dorada',
      'Un atrevido joven es despedido de la empresa familiar por su tío millonario. Casualmente conoce a una muchacha que, escapando de su compromiso matrimonial con un duque, parece buscar lo mismo que él: un día libre. Juntos, vivirán una gran aventura y descubrirán que a pesar de sus diferencias pueden ser almas gemelas.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2023-09-24',
      ARRAY['Fiction']::TEXT[],
      35,
      'https://books.google.com/books/content?id=Zz3aEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.62,
      15.93,
      12
    ),
(
      '9789877448337',
      'La aventura del pudding de Navidad',
      'Un príncipe oriental inicia una aventura con una chica de dudosa reputación en Londres, para conquistarla exhibe un emblemático rubí que desaparece junto con la joven en cuestión de horas. Hércules Poirot es convocado urgentemente para recuperarlo. Haciéndose pasar por un invitado en la casa de los Lacey, el detective compartirá una Navidad tradicional para seguir el rastro de los ladrones hasta dar con la valiosa joya.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2023-06-29',
      ARRAY['Fiction']::TEXT[],
      111,
      'https://books.google.com/books/content?id=albHEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.56,
      11.34,
      19
    ),
(
      '9789877449419',
      'La Huella del Pulgar de San Pedro',
      'Durante una de las reuniones del Club de los Martes, la ingeniosa Miss Marple relata cómo ayudó a su sobrina Mabel a demostrar su inocencia cuando fue acusada injustamente por el asesinato de su esposo. Agatha Christie demuestra una vez más que sus detectives son profundamente sagaces, tanto los profesionales como los aficionados, y que ella conoce como nadie la naturaleza humana.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2024-07-03',
      ARRAY['Fiction']::TEXT[],
      37,
      'https://books.google.com/books/content?id=gz4yEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      5.20,
      7.80,
      9
    ),
(
      '9789877446111',
      'El misterio del cofre español',
      'Cinco amigos son invitados a la casa de uno de ellos para compartir una deliciosa cena, escuchar música y bailar un poco. Se divierten, disfrutan sin excesos ni borracheras. A la mañana siguiente, el mayordomo llega a ordenar y se sorprende al ver una gran mancha en la alfombra sobre la que se encuentra apoyado un antiguo arcón español. Al levantar la tapa del mueble descubre horrorizado que dentro del cofre se encuentra el cadáver de uno de los invitados, el señor Clayton, con una daga clavada en el cuello. Hércules Poirot es convocado para ayudar a la atractiva señora Clayton a develar este extraño misterio.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2021-06-25',
      ARRAY['Fiction']::TEXT[],
      79,
      'https://books.google.com/books/content?id=z_-GEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.09,
      15.13,
      22
    ),
(
      '9789877449389',
      'Los Cuatro Sospechosos',
      'En esta historia breve, Agatha Christie explora el problema de los crímenes impunes, y los errores al considerar inocente a un culpable o viceversa. En el famoso Club de los Martes. Henry Clithering, ex comisionado de Scotland Yard, expone un caso no resuelto. El misterio involucra a cuatro sospechosos de quienes no se puede probar ni su culpabilidad, ni su inocencia. Solo se sabe que uno de ellos trabajó en una organización terrorista empeñada en asesinar a la víctima. Gracias a una serie de pistas, Miss Marple logrará identificar al verdadero culpable y desentrañar el misterio.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2024-05-28',
      ARRAY['Fiction']::TEXT[],
      25,
      'https://books.google.com/books/content?id=cz4yEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.46,
      15.69,
      12
    ),
(
      '9789877448269',
      'El misterio de Listerdale',
      'Una familia de clase alta, en bancarrota, alquila una maravillosa mansión por un precio ridículamente bajo. La casa pertenece a Lord Listerdale, quien se supone se ha ido de viaje pero nadie sabe adónde. Rupert, hijo de la señora Saint Vincent, la inquilina, cree que el hombre está muerto y que su cuerpo está escondido en algún lugar de la casa. Una serie de coincidencias ayudarán al joven a descubrir el misterio detrás del antiguo propietario.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2023-05-13',
      ARRAY['Fiction']::TEXT[],
      33,
      'https://books.google.com/books/content?id=XHC-EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      12.91,
      19.37,
      11
    ),
(
      '9789877448870',
      'La ahogada',
      'Una antigua amiga le cuenta a Miss Marple que una de las muchachas del pueblo se arrojó desde un puente y se ahogó. La joven había descubierto que estaba embarazada y todos creen que se quitó la vida. Pero Miss Marple, que conoce profundamente la naturaleza humana, no cree que haya sido un suicidio. Con la ayuda de Henry Clithering, ex comisionado de Scotland Yard, llegará al fondo del asunto hasta descubrir al verdadero responsable.',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2023-11-16',
      ARRAY['Fiction']::TEXT[],
      53,
      'https://books.google.com/books/content?id=ySLjEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.58,
      15.87,
      13
    ),
(
      '9789877449341',
      'Tragedia Navideña',
      'Si te gusta el suspenso y los relatos de detectives, no te pierdas esta "tragedia navideña" de Agatha Christie. En esta narración, Agatha Christie vuelve a presentar a Miss Marple, la anciana famosa por su ingenio y su talento para develar misterios. Una vez más, el Club de los Martes se verá sorprendido por Miss Marple, y Agatha Christie demostrará que incluso los expertos en la naturaleza humana, a veces, pueden fallar. ¿Será un asunto menos en el extenso recorrido de Miss Marple y los trece problemas?',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2024-04-30',
      ARRAY['Fiction']::TEXT[],
      26,
      'https://books.google.com/books/content?id=bz4yEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      8.28,
      12.42,
      10
    ),
(
      '9788467076547',
      'Un triste ciprés',
      'Una de las novelas preferidas de Agatha Christie y menos conocidas por los lectores. La hermosa y joven Elinor Carlisle se encuentra en el banquillo de los acusados, está siendo juzgada por el posible asesinato de su prima Mary Gerrard. Las pruebas son abrumadoras: solo Elinor tenía el motivo, la oportunidad y los medios para administrar el fatal veneno. Sin embargo, dentro de la hostil sala del tribunal, solo un hombre aún cree que Elinor es inocente hasta que se demuestre lo contrario: Hércules Poirot es lo único que se interpone entre Elinor y la horca.',
      ARRAY['Agatha Christie']::TEXT[],
      'Espasa',
      '2025-02-19',
      ARRAY['Fiction']::TEXT[],
      230,
      'https://books.google.com/books/content?id=eK89EQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      6.89,
      10.33,
      18
    ),
(
      '9788483652633',
      'Agatha Christie. Los cuadernos secretos',
      'Una fascinante exploración del contenido de los 73 cuadernos de notas de Agatha Christie recientemente descubiertos, que incluyen ilustraciones, extractos eliminados y dos novelas inéditas de Poirot. Cuando Agatha Christie falleció en 1976 se había convertido en la escritora más popular del mundo. Con unas ventas billonarias en todo el mundo y publicada en más de 100 países, había conseguido lo imposible: publicar más de un libro al año desde la década de 1920, y todos ellos éxitos de ventas. Tras la muerte de la hija de Agatha, Rosalind, a finales de 2004, se reveló un extraordinario legado. Entre sus objetos personales de la residencia familiar de Greenway se desenterraron los cuadernos privados de Agatha Christie, 73 volúmenes escritos a mano que habían permanecido en gran parte ignorados, probablemente debido a que la inconfundible caligrafía de Agatha era muy dificultosa de leer. Pero cuando el archivero John Curran comenzó a descifrar los cuadernos, se hizo evidente la magnitud de este tesoro escondido... Este libro abre la tapa del mayor secreto de Agatha Christie: cómo sus anotaciones, listados y borradores se convirtieron en los exitosos libros, obras de teatro y relatos que finalmente fueron. Argumentos alternativos, escenas eliminadas, incluso sus planes para libros que no llegó a escribir, la investigación de Curran revela una enorme riqueza de material inédito, incluidas dos novelas cortas de Hércules Poirot.',
      ARRAY['John Curran']::TEXT[],
      'SUMA',
      '2011-07-06',
      ARRAY['Fiction']::TEXT[],
      467,
      'https://books.google.com/books/content?id=GeMIxzbEaWQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      9.73,
      14.60,
      7
    ),
(
      '9789877448993',
      'La casa del ídolo de Astarté',
      'En el segundo encuentro del Club de los martes, el clérigo doctor Pender relata un caso del que participó hace muchos años. Dentro de la finca de su amigo Richard Haydon había un bosque muy antiguo repleto de tesoros arqueológicos. Se decía que en ese lugar se habían realizado sangrientos ritos sagrados, justo frente a una estatua que representaba a la diosa Astarté. Durante una reunión, los invitados de Sir Richard visitan el sitio y una muchacha entra en trance, mientras que uno de los hombres cae muerto frente a todos los demás. ¿Podrán los integrantes del Club resolver un caso que parece completamente sobrenatural?',
      ARRAY['Agatha Christie']::TEXT[],
      'MB Cooltura',
      '2023-12-22',
      ARRAY['Fiction']::TEXT[],
      37,
      'https://books.google.com/books/content?id=VWTqEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      9.98,
      14.97,
      13
    ),
(
      '9788417951610',
      'Tolkien. Breve introducción a la Tierra Media',
      'Ideal un para público que ya conoce las obras de Tolkien, pero quiere comprender su trasfondo cultural, filosófico y personal, así como seguidores de la saga de El señor de los Anillos y la serie de Los anillos de poder. El Hobbit, El Señor de los Anillos y El Silmarillion son obras que marcaron la historia de la literatura, pero ¿quién era realmente J.R.R. Tolkien? ¿Qué lo llevó a crear uno de los mundos más ricos, complejos y universales de la literatura moderna? En este libro claro, atractivo y documentado, el catedrático Matthew Townend —experto en filología medieval y literatura comparada— traza un retrato profundo y accesible del Tolkien, explorando sus estudios, su vida personal, sus pasiones lingüísticas y sus influencias culturales. Además, incluye un prólogo especial de Miguel Salas (La escóbula de la brújula), que conecta la obra de Tolkien con la filosofía y el pensamiento simbólico. Un texto perfecto tanto para fans de la fantasía como para estudiosos de la literatura o lectores curiosos que desean ir más allá de las historias... y descubrir el alma que las creó.',
      ARRAY['Matthew Townend']::TEXT[],
      'Editorial Alfabeto',
      '2025-09-17',
      ARRAY['Literary Collections']::TEXT[],
      195,
      'https://books.google.com/books/content?id=H4KFEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      13.36,
      20.04,
      19
    ),
(
      '9682000084',
      'Tolkien Y Orwell Los Mitos Y El Sentido de la Historia',
      NULL,
      ARRAY['José Antonio Forzán', 'Rafael García Pavón']::TEXT[],
      'Publicaciones Cruz O., S.A.',
      '2006',
      ARRAY['Ethics in literature']::TEXT[],
      216,
      'https://books.google.com/books/content?id=WPW7MvFh3akC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      6.22,
      9.33,
      20
    ),
(
      '844507038X',
      'El Silmarillion',
      'El Silmarillion es el cuerpo central de los textos narrativos de J.R.R. Tolkien, una obra que no pudo publicar en vida porque crecio unto con el. Tolkien comenzo a escribirlo mucho antes que El Hobbit, obra concebida como historia independiente, pero que fue parte de lo que el llamaba un "tema que copia y se ramifica," y del que emergio El Senor de los Anillos. El Silmarillion cuenta la historia de la Primera Edad, el antiguo drama del que hablan los personajes de El Senor de los Anillos, y en cuyos acontecimientos algunos de ellos tomaron parte, como Elrond y Galadriel. Los tres Silmarils eran gemas creadas por Fj .or, el mas dotado de los Elfos, y contenian la Luz de los Dos Crboles de Valinor antes que los Crboles mismos fueran destruidos por Morgoth, el primer Senor Oscuro. Desde entonces la inmaculada Luz de Valinor vivio solo en los Silmarils, pero Morgoth se apodero de ellos, y los engarzo en su corona, guardada en la fortaleza impenetrable de Angband en el norte de la Tierra Media.En este volumen se incluyen otras obras cortas, como el Ainulindali/ la Musica de los Ainur, la creacion mitica del mundo, y el Valaquenta, sobre la naturaleza y poderes de los dioses. A El Silmarillion sigue el Akallabeth, que vuelve a narrar la caida del reino de Numenor al fin de la Segunda Edad, y por ultimo la historia De los Anillos del Poder, en la que el tema de El Senor de los Anillos reaparece en la perspectiva mas amplia de El Silmarillion. El Silmarillion no es una novela, ni un cuento de hadas, ni una historia ficticia. Podria definirse como una obra de imaginacion inspirada, una vision sombria, legendaria o mitica, del interminable conflicto entre el deseo de poder y la capacidad de crear.',
      ARRAY['J. R. R. Tolkien']::TEXT[],
      NULL,
      '1984',
      ARRAY['Fiction']::TEXT[],
      490,
      'https://books.google.com/books/content?id=n4U8PgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      8.61,
      12.91,
      11
    ),
(
      '8445073591',
      'Los Pueblos de la Tierra Media',
      'Cuando J.R.R. Tolkien dejó de lado El Silmarillion en 1937, el desarrollo de la «mitología» de las últimas Edades apenas había comenzado. Fue en los Apéndices de El Señor de los Anillos donde surgió una estructura histórica comprensible y una cronología de la Segunda y Tercera Edad, abarcando todos los hilos que confluirían en La Guerra del Anillo. Es bien conocido el retraso en la publicación de El Retorno del Rey por la dificultad que encontró en redactar esos Apéndices. Pero en Los Pueblos de la Tierra Media Christopher Tolkien demuestra que existía una estructura original en escritos sueltos y en notas que difieren de la versión publicada. En estos textos tempranos se ve la evolución de la estructura cronológica de las últimas Edades, los calendarios, las genealogías de los hobbits y el lenguaje Oestron o Lengua Común.',
      ARRAY['J. R. R. Tolkien', 'Christopher Tolkien']::TEXT[],
      'Ediciones Minotauro',
      '2002',
      ARRAY['Comics & Graphic Novels']::TEXT[],
      544,
      'https://books.google.com/books/content?id=Vz0MAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      5.35,
      8.02,
      20
    ),
(
      '9780007445189',
      'The Road to Middle-earth: How J. R. R. Tolkien created a new mythology',
      'A detailed and fascinating journey to the roots of The Lord of the Rings, by award-winning Tolkien expert Professor Tom Shippey.',
      ARRAY['Tom Shippey']::TEXT[],
      'HarperCollins UK',
      '2012-03-08',
      ARRAY['Fiction']::TEXT[],
      589,
      'https://books.google.com/books/content?id=7FYh_hryh9wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      6.70,
      10.05,
      8
    ),
(
      '9780547739670',
      'Exploring J.r.r. Tolkien''s "the Hobbit"',
      'Exploring J.R.R. Tolkien''s The Hobbit is an in-depth look at one of the most beloved books of the twentieth century, uncovering its secrets and delights. "An admirable and thought-provoking consideration of the underlying themes of The Hobbit, following the there-and-back-again progress from its famous first line on through to Bilbo''s return home at the story''s end." —Douglas A. Anderson, author of The Annotated Hobbit A fun, thoughtful, and insightful companion volume designed to bring a thorough and original new reading of this great work to a general audience, Tolkien scholar Corey Olsen takes readers on a thorough journey through The Hobbit chapter by chapter, revealing the stories within the story: the dark desires of dwarves and the sublime laughter of elves, the nature of evil and its hopelessness, the mystery of divine providence and human choice, and, most of all, the transformation within the life of Bilbo Baggins. Exploring J.R.R. Tolkien''s The Hobbit is a book that will make the classic fantasy story come alive for readers as never before. "Worthy of your tightly guarded dragon''s treasure. . . . Indispensable." — Boston Globe "Sharing Corey Olsen''s personal view of The Hobbit is like having a long conversation with someone who shares the love of a favorite book and is excited to talk about it. His exploration of the journey of Bilbo Baggins will encourage readers to think more deeply about Tolkien''s classic tale." —Wayne G. Hammond and Christina Scull, authors of The Art of The Hobbit by J. R. R. Tolkien',
      ARRAY['Corey Olsen']::TEXT[],
      'HarperCollins',
      '2012-09-18',
      ARRAY['Literary Criticism']::TEXT[],
      333,
      'https://books.google.com/books/content?id=LcXDzr-tj58C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      5.43,
      8.14,
      11
    ),
(
      '9788445077917',
      'El Señor de los Anillos no 01/03 La Comunidad del Anillo (edición revisada)',
      'Primera entrega de la trilogía. «Este libro es como un relámpago en un cielo claro. Decir que la novela heroica, espléndida, elocuente y desinhibida, ha retornado de pronto en una época de un antirromanticismo casi patológico, sería inadecuado. Para quienes vivimos en esa extraña época, el retorno —y el alivio que nos trae— es sin duda lo más importante. Pero para la historia misma de la novela —una historia que se remonta a la Odisea y a antes de la Odisea— no es un retorno, sino un paso adelante o una revolución: la conquista de un territorio nuevo.» —C.S. Lewis, Time & Tide, 1954 «La obra de Tolkien, difundida en millones de ejemplares, traducida a docenas de lenguas, inspiradora de slogans pintados en las paredes de Nueva York y de Buenos Aires... una coherente mitología de una autenticidad universal creada en pleno siglo veinte.» —George Steiner, Le Monde, 1973',
      ARRAY['J. R. R. Tolkien']::TEXT[],
      'Grupo Planeta Spain',
      '2010-07-15',
      ARRAY['Fiction']::TEXT[],
      617,
      'https://books.google.com/books/content?id=DYmUGGwZ8_oC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      13.87,
      20.80,
      18
    ),
(
      '9788432161179',
      'J.R.R. Tolkien. Génesis de una leyenda',
      'Tras el éxito en el cine de la trilogía El Señor de los Anillos, el mundo recreado por Tolkien ha capturado la atención de millones de lectores en todo el mundo. Pero ¿quién fue realmente ese hombre, capaz de idear semejante universo? Sus primeros años fueron difíciles: huérfano y pobre, se le prohibió comunicarse con la mujer que amaba, y vivió de cerca los horrores de la Primera Guerra Mundial. Dedicó largos años a desarrollar los personajes e historias de su Tierra Media, su geografía, sus lenguajes y su mitología, manifestando un conocimiento formidable de la historia y de la cultura. Esta accesible biografía ayuda a conocer cómo se gestó este gigante de la literatura.',
      ARRAY['Colin Duriez']::TEXT[],
      'Ediciones Rialp, S.A.',
      '2022-03-16',
      ARRAY['Biography & Autobiography']::TEXT[],
      225,
      'https://books.google.com/books/content?id=DoVoEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.31,
      15.46,
      6
    ),
(
      '9788445077924',
      'El Señor de los Anillos no 02/03 Las Dos Torres (edición revisada)',
      'Segunda entrega revisada de la famosa saga de la Tierra Media. La Compañía se ha disuelto y sus integrantes emprenden caminos separados. Frodo y Sam avanzan solos en su viaje a lo largo del río Anduin, perseguidos por la sombra misteriosa de un ser extraño que también ambiciona la posesión del Anillo. Mientras, hombres, elfos y enanos se preparan para la batalla final contra las fuerzas del Señor del Mal',
      ARRAY['J. R. R. Tolkien']::TEXT[],
      'Grupo Planeta Spain',
      '2010-07-15',
      ARRAY['Fiction']::TEXT[],
      501,
      'https://books.google.com/books/content?id=Yzaq2MRpjZkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      13.63,
      20.45,
      18
    ),
(
      '8445071572',
      'J.R.R. Tolkien',
      'Humphrey Carpenter, autor entre otros libros de una biografia del poeta W.H. Auden, narra en esta obra la larga carrera de J.R.R. Tolkien desde las vicisitudes de una infancia dificil a los trabajos y obligaciones de la vida academica, como profesor en la Universidad de Oxford. Carpenter ha escrito esta primera biografia del creador de la Tierra Media, consultando documentos ineditos, y entrevistando a parientes y amigos.',
      ARRAY['Humphrey Carpenter']::TEXT[],
      NULL,
      '1990',
      ARRAY['Juvenile Nonfiction']::TEXT[],
      295,
      'https://books.google.com/books/content?id=uZA8PgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      13.42,
      20.13,
      22
    ),
(
      '9703701701',
      'El Señor de los Anillos III',
      'Los ejércitos del Señor Oscuro van extendiendo cada vez más su maléfica sombra por la Tierra Media. Hombres, elfos y enanos unen sus fuerzas para presentar batalla a Sauron y sus huestes. Ajenos a estos preparativos, Frodo y Sam siguen adentrándose en el país de Mordor en su heroico viaje para destruir el Anillo de Poder en las Grietas del Destino.',
      ARRAY['John Ronald Reuel Tolkien']::TEXT[],
      NULL,
      '2010-04-28',
      ARRAY['Fiction']::TEXT[],
      NULL,
      NULL,
      12.45,
      18.67,
      16
    ),
(
      '6070797795',
      'J. R. R. Tolkien. Una Biografía',
      NULL,
      ARRAY['Humphrey Carpenter']::TEXT[],
      'Planeta Publishing',
      '2023-05-23',
      NULL,
      NULL,
      'https://books.google.com/books/content?id=ySPYzwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      5.45,
      8.18,
      9
    ),
(
      '8445016075',
      'J. R. R. TOLKIEN. ARTISTA E ILUSTRADOR',
      'Un libro que explora todas las dimensiones del arte del creador de la Tierra Media. J.R.R. Tolkien (1892-1973), renombrado autor de El Hobbit, El Señor de los Anillos y El Silmarillion, era también un creador de imágenes. Aunque a menudo él mismo comentó que no tenía talento de dibujante, sus pinturas y dibujos han fascinado a generaciones de lectores. En realidad J.R.R. Tolkien fue un auténtico artista, con un sentido natural y agudo del diseño. J.R.R. Tolkien, artista e ilustrador explora todas las dimensiones del arte de Tolkien, desde las pinturas y los dibujos de su infancia hasta las ilustraciones para los relatos de la Tierra Media, y los libros para niños Cartas de Papá Noel y El señor Bliss. El libro examina además la expresiva caligrafía de Tolkien, y sus aportaciones a la tipografía y al diseño de sus libros.',
      ARRAY['Wayne G Hammond', 'Christina Scull']::TEXT[],
      NULL,
      '2023',
      NULL,
      NULL,
      NULL,
      8.07,
      12.11,
      13
    ),
(
      '9788445012048',
      'La naturaleza de la Tierra Media',
      'Un libro con detalles de la filosofía, imaginación y subcreación de Tolkien. J.R.R. Tolkien opinaba que El Silmarillion era el fundamento para su mundo imaginado, pero a pesar de ser la obra primaria y central, no fue capaz de llevarla a su forma final, y le tocó a su hijo, Christopher, construir la última versión de un ''Silmarillion'' a partir de los relatos dejados por su padre cuando éste falleció. Porque, partiendo de un mito cerrado, con un comienzo y un final, el material narrativo había llegado a adquirir una extensión enorme, con importantes personajes que emergían de los Días Antiguos, entre los cuales Galadriel era la más importante. Por lo tanto, Tolkien tuvo que realizar una gran cantidad de "reescrituras" para que El Silmarillion guardase una correcta relación con El Señor de los Anillos. Los escritos recogidos en La naturaleza de la Tierra Media muestran los caminos que Tolkien tomó en busca de una mejor comprensión —más precisa, completa y consistente— de su propia y singular creación. Estos escritos, de diferentes extensiones, abarcan diversos temas, tales como: *El envejecimiento y la actuación del tiempo sobre los seres inmortales y mortales de la Tierra Media, y el sorprendente grado de precisión y habilidad matemática que Tolkien aplicó para conseguir unos esquemas rigurosos en este sentido; *Asuntos fundacionales como la creación, la vida, el destino y el libre albedrío, el funcionamiento del cuerpo y el espíritu y la relación entre ambos, así como la naturaleza de la autoridad, el sentido de la vida y la muerte; *Descripciones vívidas de las tierras, los animales y los pueblos de Númenor; *Descripciones del aspecto físico de varios personajes de El Señor de los Anillos, entre ellas explicaciones de quién tenía barba y quién no. Todos estos escritos revelan nuevos e insospechados detalles de la filosofía, imaginación y subcreación de Tolkien, que resultan sorprendentes, profundos e incluso divertidos. Esta nueva colección, que ha sido editada por Carl F. Hostetter, uno de los principales expertos en Tolkien, es un auténtico tesoro que ofrece a los lectores una oportunidad de mirar sobre el hombro del Profesor Tolkien mientras iba descubriendo cosas nuevas. En cada página, la Tierra Media vuelve a cobrar vida con una fuerza extraordinaria.',
      ARRAY['J. R. R. Tolkien']::TEXT[],
      'Minotauro',
      '2022-03-16',
      ARRAY['Fiction']::TEXT[],
      507,
      'https://books.google.com/books/content?id=ZfJEEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      14.29,
      21.43,
      14
    ),
(
      '1586638432',
      'J.R.R. Tolkien',
      NULL,
      ARRAY['Stanley P. Baldwin']::TEXT[],
      'Spark Notes',
      '2003',
      ARRAY['Biography & Autobiography']::TEXT[],
      230,
      'https://books.google.com/books/content?id=T5z33xr0c6AC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      13.72,
      20.58,
      21
    ),
(
      '8445071564',
      'La traición de Isengard',
      'LA HISTORIA DE "EL SEÑOR DE LOS ANILLOS" II Edición por Christopher Tolkien La traición de Isengard es el segundo volumen dedicado a la evolución de El Señor de los Anillos. En este libro, siguiendo a la extensa pausa en la oscuridad de las Minas de Moria con que concluye El Retorno de la Sombra, se rastrea la gran expansión de la historia en nuevas tierras y gentes al sur y al este de las Montañas Nubladas; la emergencia de Lothórian, los Ents, los Jinetes de Rohan y Saruman el Blanco en la fortaleza de Isengard. En breves esbozos y borradores a lápiz se asiste a la primera aparición de Galadriel, las primeras ideas sobre la historia de Gondor, el encuentro original de Aragorn y Éowyn, cuyo significado cambiará más tarde totalmente. Muchas de las primeras ideas y concepciones desaparecen a medida que la historia sigue sus propios caminos, como el relato de la captura de Frodo y el episodio en que Sam Gamyi lo rescata de Minas Morgul, escrito mucho antes de que J.R.R. Tolkien llegara a ese punto en la redacción de El Señor de los Anillos. Una característica importante de este libro es la historia de como nació el mapa original, redibujado en fases sucesivas, y que durante mucho tiempo fue la base de la geografía de la Tierra Media. Cierra el libro un apéndice dedicado a los alfabetos rúnicos tal como eran entonces, con ilustraciones de las formas y un análisis de las runas utilizadas en el Libro de Mazarbul encontrado en Moria junto a la tumba de Balin.',
      ARRAY['J. R. R. Tolkien']::TEXT[],
      NULL,
      '1994',
      ARRAY['Comics & Graphic Novels']::TEXT[],
      588,
      'https://books.google.com/books/content?id=Gpp9LwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      8.17,
      12.25,
      16
    ),
(
      '6070792238',
      'El Señor de Los Anillos. La Comunidad Del Anillo (TV Tie-In) (the Lord of the Rings. the Fellowship of the Ring [Tv Tie-In]) (Spanish Edition)',
      'Un héroe inesperado. Una misión peligrosa. La mayor aventura que jamás te hayan contado. La primera entrega de la trilogía de J. R. R. Tolkien El Señor de los Anillos En la adormecida e idílica Comarca, un joven hobbit recibe un encargo: custodiar el Anillo Único y emprender el viaje para su destrucción en la Grieta del Destino. Acompañado por magos, hombres, elfos y enanos, atravesará la Tierra Media y se internará en las sombras de Mordor, perseguido siempre por las huestes de Sauron, el Señor Oscuro, dispuesto a recuperar su creación para establecer el dominio definitivo del Mal. «La obra de Tolkien, difundida en millones de ejemplares, traducida a docenas de lenguas, inspiradora de slogans pintados en las paredes de Nueva York y de Buenos Aires... una coherente mitología de una autenticidad universal creada en pleno siglo veinte.» --George Steiner, Le Monde, 1973 ENGLISH DESCRIPTION Inspired by The Hobbit and begun in 1937, The Lord of the Rings is a trilogy that J.R.R. Tolkien created to provide "the necessary background of history for Elvish tongues". From these academic aspirations was born one of the most popular and imaginative works in English literature. The Fellowship of the Ring, the first volume in the trilogy, tells of the fateful power of the One Ring. It begins a magnificent tale of adventure that will plunge the members of the Fellowship of the Ring into a perilous quest and set the stage for the ultimate clash between the powers of good and evil. In this splendid, unabridged audio production of Tolkien''s great work, all the inhabitants of a magical universe - hobbits, elves, and wizards - step colorfully into life. Rob Inglis'' narration has been praised as a masterpiece of audio.',
      ARRAY['J. R. R. Tolkien']::TEXT[],
      'Planeta Publishing',
      '2022-09-27',
      ARRAY['Fiction']::TEXT[],
      NULL,
      'https://books.google.com/books/content?id=6sRGzwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      13.02,
      19.53,
      18
    ),
(
      '9788445001226',
      'Ha Tierra Media No 01/12 El libro de los cuentos perdidos 1',
      'Reedición de la Historia de la Tierra Media. El Libro de los Cuentos perdidos fue la primera gran obra de imaginación de J.R.R. Tolkien, comenzada en 1916-1917, cuando tenía veinticinco años, y abandonada varios años después. Es en realidad el principio de toda la concepción de la Tierra Media y Valinor, y el primer esbozo de los mitos y leyendas que constituirían El Silmarillion. El marco narrativo es el largo viaje hacia el Oeste que emprende un marinero llamado Eriol (Ælfwine) a Tol Eressëa, la isla solitaria donde habitan los Elfos. Allí conoce los Cuentos Perdidos de Elfinesse, en los que aparecen las ideas y concepciones más tempranas sobre los Dioses y los Elfos, los Enanos, los Balrogs y los Orcos, los Silmarils, los dos Árboles de Valinor, Nargothrond y Gondolin, y la geografía y la cosmología de la Tierra Media. El libro de los Cuentos Perdidos se publica en dos volúmenes. El primero contiene los cuentos de Valinor, y el segundo incluye Beren y Lúthien, Túrin y el Dragón, y las historias del Collar de los Enanos y la Caída de Gondolin. Cada cuento es seguido de un comentario —un ensayo breve— , y de algún poema relacionado con el texto, y en cada uno de los volúmenes hay abundante información sobre el vocabulario y los nombres de las primeras lenguas élficas. El Libro de los Cuentos perdidos es el germen de la Tierra Media de Tolkien y de toda su producción literaria.',
      ARRAY['J. R. R. Tolkien']::TEXT[],
      'Grupo Planeta Spain',
      '2012-12-14',
      ARRAY['Fiction']::TEXT[],
      540,
      'https://books.google.com/books/content?id=_LIfNCn06J8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.25,
      10.88,
      20
    ),
(
      '970370168X',
      'El señor de los anillos',
      NULL,
      ARRAY['John Ronald Reuel Tolkien']::TEXT[],
      NULL,
      '2004',
      ARRAY['Baggins, Frodo (Fictitious character)']::TEXT[],
      567,
      NULL,
      6.43,
      9.64,
      9
    ),
(
      '9788476843130',
      'La poesía de Jorge Luis Borges',
      NULL,
      ARRAY['Vicente Cervera Salinas']::TEXT[],
      'EDITUM',
      '1992',
      ARRAY['Fiction']::TEXT[],
      246,
      'https://books.google.com/books/content?id=Ccyos1-xzfUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      11.35,
      17.02,
      23
    ),
(
      '9562825078',
      'La máquina de pensar de Borges',
      NULL,
      ARRAY['Sergio Missana']::TEXT[],
      'Lom Ediciones',
      '2003',
      ARRAY['Argentine poetry']::TEXT[],
      170,
      'https://books.google.com/books/content?id=BvCylRUo1z0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      14.11,
      21.16,
      13
    ),
(
      '9788499892665',
      'El libro de arena',
      '125.o ANIVERSARIO DE BORGES Un libro fundamental de Borges, «el escritor en español más importante desde Cervantes» (Mario Vargas Llosa), considerado por el autor su obra maestra, y que incluye su único relato de amor. «Borges es y debería ser el centro de nuestro canon». Roberto Bolaño Escrito en el ocaso de su vida y publicado en 1975, El libro de arena es una obra esencial de Borges, uno de los autores latinoamericanos más influyentes del siglo XX, ganador del Premio Cervantes y del Nacional de Literatura. Trece piezas magistrales -la mayoría del género fantástico- que indagan en sus grandes temas y obsesiones. En «El otro», el propio Borges se encuentra con su alter ego. «Ulrica» -su único relato de amor- cuenta la historia de un enamoramiento en apariencia efímero. «El Congreso» describe una empresa tan vasta que se confunde con el cosmos. «Undr» y «El espejo y la máscara» imaginan literaturas que constan de una sola palabra. «El libro de arena», en cambio, se centra en un volumen de incalculables hojas, monstruoso, que anida en la Biblioteca Nacional de Buenos Aires: sin principio ni fin, infinito y eterno como toda la obra borgeana. Críticas: «El escritor en español más importante desde Cervantes. [...] Uno de los artistas contemporáneos más memorables. [...] La deuda que tenemos contraída con él quienes escribimos en español es enorme». Mario Vargas Llosa «Uno de los escritores más extraordinarios del siglo XX». The New York Times « El libro de arena se disgrega en cuentos infinitos, como los granos de un desierto habitado por páginas, por sombras, por dobles. Son relatos circulares, que no se terminan de resolver y que continuarán para siempre dando forma a nuestra felicidad y a nuestras pesadillas». Augusto F. Prieto, El Correo «El escritor latinoamericano más influyente del siglo XX». The Washington Post Book World «Junto con un pequeño séquito de colegas y profetas (se me ocurren Kafka y Joyce), Borges es más que un cuentista sorprendente y un brillante estilista: es un espejo que refleja el espíritu de su tiempo». Chicago Tribune «Borges, visionario escéptico, nos fascina. [...] Cumple con nuestro anhelo esencial en cuanto a las razones por que leemos». Harold Bloom, Cómo leer a Jorge Luis Borges «No lo cite: léalo. [...] Urge no ya leerlo o releerlo, sino, como sugería Bolaño, "releerlo otra vez"». Gonzalo Núñez, La Razón',
      ARRAY['Jorge Luis Borges']::TEXT[],
      'DEBOLS!LLO',
      '2011-05-06',
      ARRAY['Fiction']::TEXT[],
      92,
      'https://books.google.com/books/content?id=i0PU7eidyWoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.93,
      16.39,
      5
    ),
(
      '9788490325681',
      'Libro de sueños',
      'El sueño como el más antiguo y no menos complejo de los géneros literarios. Una asombrosa recopilación de la mano de Jorge Luis Borges. En este volumen, Borges presenta relatos de paisaje onírico de distintas épocas y documenta lo que ha soñado el hombre desde que es hombre, discurriendo por el sendero que va de las primeras civilizaciones a Kafka, revisando los trances proféticos del Antiguo Testamento, las epopeyas clásicas o la filosofía china. Una fabulosa antología, en definitiva, que consagra el sueño como el más antiguo y complejo de los géneros literarios. «Este Libro de sueños que los lectores volverán a soñar abarca sueños de la noche -los que yo firmo, por ejemplo-, sueños del día, que son un ejercicio voluntario de nuestra mente, y otros de raigambre perdida: digamos, el Sueño anglosajón de la Cruz.»',
      ARRAY['Jorge Luis Borges']::TEXT[],
      'DEBOLS!LLO',
      '2013-04-11',
      ARRAY['Literary Criticism']::TEXT[],
      215,
      'https://books.google.com/books/content?id=fT1R8r_CkOIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      6.72,
      10.08,
      12
    ),
(
      '0900411171',
      'Borges y la nada',
      NULL,
      ARRAY['Manuel Ferrer']::TEXT[],
      'Tamesis',
      '1971',
      ARRAY['Literary Criticism']::TEXT[],
      216,
      'https://books.google.com/books/content?id=H4R37GJthjkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.34,
      11.01,
      23
    ),
(
      '9788420479781',
      'Borges esencial. Edición Conmemorativa / Essential Borges: Commemorative Edition',
      'Una nueva edición conmemorativa de la RAE y la ASALE que incluye lo mejor de la obra de Jorge Luis Borges. La obra fundamental del maestro de la ficción contemporánea. El presente volumen incluye los textos íntegros de Ficciones y El Aleph, dos de sus obras narrativas más representativas, así como una selección de sus poemas y textos ensayísticos. Una obra bella, pura y original escrita con un lenguaje aparentemente desnudo pero dotado de la precisión de un bisturí, y de un gran poder evocador y carga simbólica. Jorge Luis Borges nació el 24 de agosto de 1899 en Buenos Aires. Su obra ha sido traducida a más de veinticinco idiomas, y actualmente Jorge Luis Borges es considerado uno de los más importantes autores en lengua hispana de todos los tiempos. Murió en Ginebra el 14 de junio de 1986. ENGLISH DESCRIPTION A new, commemorative edition by the Real Academia Española and the ASALE that includes the best of Jorge Luis Borges’s work. The fundamental works of the master of contemporary fiction. This volume includes the unabridged texts of Ficciones and El Aleph, two of his most representative narrative works, as well as a selection of his poems and essays. A beautiful, pure, and original work, written in a bare style but with the precision of a scalpel, and with great evocative power and symbolic weight. Jorge Luis Borges was born on August 24, 1899, in Buenos Aires. His works have been translated into more than 25 languages, and Borges is currently considered one of the most important Spanish-language authors of all time. He died in Geneva in 1986.',
      ARRAY['Jorge Luis Borges']::TEXT[],
      'National Geographic Books',
      '2017-08-29',
      ARRAY['Fiction']::TEXT[],
      NULL,
      'https://books.google.com/books/content?id=iGaREAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      7.66,
      11.49,
      17
    ),
(
      '9789500737302',
      'Borges y la memoria',
      '«El trabajo de Quian Quiroga demuestra su conocimiento de la obra de Borges y va dándonos de una manera inefable la unión o la premonición entre esa obra y su especialidad, la neurociencia». María Kodama',
      ARRAY['Rodrigo Quian Quiroga']::TEXT[],
      'SUDAMERICANA',
      '2012-01-01',
      ARRAY['Science']::TEXT[],
      176,
      'https://books.google.com/books/content?id=r4PURTnAhYoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.31,
      10.96,
      15
    ),
(
      '9788426408471',
      'Borges profesor',
      '125.o ANIVERSARIO DE BORGES El libro que revela a Borges en su faceta docente, imprescindible para los amantes de su obra y de la literatura. «No lo cite: léalo.[...] Urge no ya leerlo o releerlo, sino, como sugería Bolaño, "releerlo otra vez".» Gonzalo Núñez, La Razón En 1966, Borges dictó un curso de literatura inglesa en la Universidad de Buenos Aires. Las clases fueron grabadas por algunos alumnos, que luego las transcribieron para que otros pudieran escucharlas. Las cintas originales se han perdido, pero los textos se han conservado hasta hoy. Tras un intenso trabajo de análisis e investigación de las fuentes, Martín Arias y Martín Hadis lograron compilar las transcripciones, sin modificar el lenguaje oral de Borges, que nos ha llegado intacto. La pasión de Borges, conjugada con su memoria casi infalible, hace de este libro una obra esencial para los admiradores del gran escritor argentino y los amantes de la literatura. Reseñas: «Borges es el escritor en español más importante desde Cervantes. [...] Uno de los artistas contemporáneos más memorables. [...] La deuda que tenemos contraída con él quienes escribimos en español es enorme.» Mario Vargas Llosa «Uno de los escritores más extraordinarios del siglo xx.» The New York Times «Es un lugar común llamar maestro a un gran escritor. Pero algunos lo fueron realmente. Si ya se saben de memoria to- dos sus cuentos, Borges profesor recoge las clases de literatura inglesa que dio en la Universidad de Buenos Aires, a partir de las transcripciones de alumnos.» Xavi Ayén, La Vanguardia «Reflexiones cautivadoras, llenas calor y compromiso, con el fin de comunicar amor por sus obras y así arrastrar a sus alumnos a la lectura. [...] Un profesor ejemplar que recuerda muchísimo al soberano poeta y escritor que fue.» Ángel Rupérez, Babelia ("De cómo enseñar a amar la literatura") «A los dieciocho años descubrí a Borges. Leía, pero erráticamente. No sólo su literatura me deslumbró sino que lo que pasa con Borges es que él es toda la literatura, no solamente la europea sino la universal. Fui leyendo a todos los autores que indicaba. Me ha formado mi gusto literario.» Jacobo Siruela, El Mundo «La naturaleza informal de esos registros aporta un punto de vista distinto, pero no por ello menos luminoso: ese Borges de modesta pedantería, que habla como escribe y mantiene la pulcritud de su discurso.» Karina Sainz Borgo, Vozpópuli «Junto con un pequeño séquito de colegas y profetas (se me ocurren Kafka y Joyce), Borges es más que un cuentista sorprendente y un brillante estilista: es un espejo que refl eja el espíritu de su tiempo.» Chicago Tribune «Gracias a la minuciosa reconstrucción filológica de Arias y Hadis tenemos la ocasión de asistir a las clases de Borges: [...] los admiradores del escritor estamos de enhorabuena.» José Luis García Martín, El Comercio - Cultura «Borges, visionario escéptico, nos fascina. [...] Cumple con nuestro anhelo esencial en cuanto a las razones por que leemos.» Harold Bloom, Cómo leer a Jorge Luis Borges',
      ARRAY['Jorge Luis Borges']::TEXT[],
      'LUMEN',
      '2019-11-01',
      ARRAY['Literary Criticism']::TEXT[],
      472,
      'https://books.google.com/books/content?id=noq5DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      10.08,
      15.12,
      14
    ),
(
      '9788499892672',
      'Historia de la eternidad',
      'Una de las obras clave de Borges: una reflexión sobre el tiempo, el infinito y lo finito. «Si los destinos de Edgar Allan Poe, de los vikingos, de Judas Iscariote y de mi lector secretamente son el mismo destino -el único destino posible-, la historia universal es la de un solo hombre.» En los tratados contenidos en este volumen, Borges habla de la esencia del tiempo, que se concreta bien en el mecanismo de una metáfora, bien en una refutación filosófica. El asunto es la coincidencia, la ocupación de un mismo lugar físico o mental, la repetición, la versión. Así, el ensayo sobre los traductores de Las mil y una noches tiene su eco en los símiles de la literatura germánica antigua; la doctrina de los ciclos halla su espejo en las enseñanzas de la termodinámica. Historia de la eternidad, cuya primera edición data de 1936, prefigura ya los contornos del Borges del medio siglo posterior.',
      ARRAY['Jorge Luis Borges']::TEXT[],
      'DEBOLS!LLO',
      '2011-05-06',
      ARRAY['Fiction']::TEXT[],
      113,
      'https://books.google.com/books/content?id=NnxyGlq9jcwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      7.54,
      11.31,
      16
    ),
(
      '8423988295',
      'Jorge Luis Borges',
      NULL,
      ARRAY['Jorge Luis Borges']::TEXT[],
      NULL,
      '1999',
      ARRAY['Bestiaries']::TEXT[],
      623,
      NULL,
      11.31,
      16.96,
      22
    ),
(
      '9789500756365',
      'Homenaje a Borges',
      'A treinta años de la muerte de Borges, su viuda, María Kodama, presenta al gran público, por primera vez y a manera de homenaje, una selección de las cientos de conferencias que ha dado sobre él y su obra en todo el mundo. Kodama recorre tópicos indispensables de la obra borgeana y aspectos poco conocidos de la intimidad de Borges y de la relación que la unió a él desde sus dieciséis años. Nuestra decantada relación fue pasando a través del tiempo por distintas facetas hasta culminar en el amor que nos habitaba [...] Ese amor del que fue dejando trazas a lo largo de sus libros sin decírmelo, hasta que me lo reveló en Islandia. Ese amor protegido como la Völsunga Saga por un mágico círculo de fuego, cuyo resplandor nos ocultaba de miradas indiscretas [...] Desde el centro de nuestro jardín secreto se alza esa llama que pertenece a la dinastía de los amantes [...] Esa llama hecha de amor, de lealtad, de pasión que una vez compartimos, sigue viva en mí para usted «for ever and ever and a day». MK María Kodama tenía dieciséis años cuando conoció a Jorge Luis Borges. Desde ese momento fueron inseparables. Creció junto a él: compartieron estudios, lecturas, traducciones, viajes, pasiones. A treinta años de la partida de Borges, y a manera de homenaje, este libro ofrece por primera vez una selección del conjunto de cientos de conferencias que Kodama ha dado sobre él y su obra en cada rincón del mundo. Aquí están uno de los más importantes autores en lengua hispana de la historia de la literatura y su relación con los laberintos, el tiempo, los libros, los sueños, lo fantástico; y también está el amor entre Ulrica y Javier Otárola, como eligieron llamarse en la intimidad una mujer y un hombre: María Kodama y Jorge Luis Borges.',
      ARRAY['María Kodama']::TEXT[],
      'SUDAMERICANA',
      '2016-08-01',
      ARRAY['Biography & Autobiography']::TEXT[],
      226,
      'https://books.google.com/books/content?id=HjozDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      6.66,
      9.99,
      6
    ),
(
      '9500427036',
      'Elogio de la Sombra',
      'La vejez (tal es el nombre que otros le dan) / puede ser el tiempo de nuestra dicha. / El animal ha muerto o casi ha muerto./ Quedan el hombre y el alma.. Con estos versos Jorge Luis Borges inicia el poema Elogio de la sombra que da titulo a este volumen. En su prologo escribe: A los espejos, laberintos y espadas que ya preve mi resignado lector se han agregado dos temas nuevos: la vejez y la etica... Este libro reune las composiciones en prosa y en verso escritas entre 1967 y 1969. Su publicacion celebro los 70 anos del autor y tuvo una gran acogida entre el publico y la critica. Elogio de la sombra es la plenitud de Borges, su retorno a las cosas esenciales," escribio Felix Luna. A la edad que tiene Borges, cuando el animal ha muerto o casi ha muerto, queda de el lo mas importante, es decir, el espiritu puro y las raices. Entre estos dos limites extremos, su penumbra; esa sombra que ''se parece a la eternidad.',
      ARRAY['Jorge Luis Borges']::TEXT[],
      NULL,
      '2005-08-01',
      ARRAY['Poesía argentina']::TEXT[],
      82,
      'https://books.google.com/books/content?id=jMkIPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      9.24,
      13.86,
      20
    ),
(
      '8490625565',
      'El aprendizaje del escritor',
      'Una obra inédita de Borges, única y reveladora sobre su método de escritura El taller literario de Borges Los textos inéditos suelen perdurar en papeles diversos, márgenes o cuadernos en octava; suelen encontrarse en cajones, baúles, latas de galletitas o bolsillos; éste permaneció en una cinta magnetofónica, grabada en Nueva York hace cuarenta y tres años. Esto quiere decir que antes de ser un libro, El aprendizaje del escritor fue oral, y que su texto comporta la traducción -o ventriloquia- de las transcripciones del seminario sobre escritura que ofreció Borges en la Universidad de Columbia, en 1971. Cada reunión estuvo abierta a las preguntas de los estudiantes y, a la manera de los diálogos platónicos, recrea naturalmente el contraste dramático de los puntos de vista del autor y sus lectores. Este seminario, como la vastísima obra de Borges, no encierra una sola página que no ofrezca una felicidad. ENGLISH DESCRIPTION Unpublished texts often remain on random pages, in margins, or in notebooks; they tend to be found in drawers, boxes, cookie tins, or pockets. Until now, this one has remained on an audiocassette that was recorded in New York in 1971. That is, before being a book, The Writer''s Apprenticeship was spoken word, and its text entails the translation--or ventriloquism--of transcriptions of the writing seminar that Borges gave at Columbia University that year. Each session had a time for student questions, and, like Platonic dialogue, naturally recreates the dramatic contrast between the points of view of the author and his readers. This course, like the extensive works of Borges, does not contain a single page that doesn''t also offer happiness.',
      ARRAY['Jorge Luis Borges']::TEXT[],
      NULL,
      '2015',
      ARRAY['Literary Criticism']::TEXT[],
      NULL,
      'https://books.google.com/books/content?id=WiJFrgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      5.44,
      8.16,
      14
    ),
(
      '9780307950949',
      'El Aleph / The Aleph',
      '“Uno de los artistas contemporáneos más memorables… La deuda que tenemos contraída con él quienes escribimos en español es enorme”. —Mario Vargas Llosa Considerado uno de los escritores más influyentes del siglo XX en cualquier idioma, la obra de Jorge Luis Borges continúa inspirando a nuevas generaciones de lectores gracias al deslumbrante poder de sus imágenes y la inmensa profundidad de sus temas. Originalmente publicada en 1949, esta colección reúne dieciocho relatos entre los que se encuentra algunos de los más admirados cuentos de la literatura: “El Aleph”, la clásica historia de una resplandeciente esfera en la que confluyen de un modo asombroso todos los tiempos y todos los espacios en el universo; “El Zahir”, una fascinante reflexión sobre la obsesión, Borges narra la historia de un objeto que inspira la fascinación inmediata de todos aquellos que lo ven hasta consumir su atención y realidad completa; y “El Inmortal”, un inquietante viaje a través de la Ciudad de los Inmortales, un laberíntico mundo en el que todo, incluso los edificios y las escaleras, aparece caóticamente irregular o invertido. Juntos, estos dieciocho relatos, cada uno singularmente original y complejo a su manera, representan una pieza clave en el museo de la obra del maestro argentino, así como en los anales de la literatura universal. ENGLISH DESCRIPTION Full of philosophical puzzles and supernatural surprises, these stories contain some of Borges’s most fully realized human characters. With uncanny insight he takes us inside the minds of an unrepentant Nazi, an imprisoned Mayan priest, fanatical Christian theologians, a woman plotting vengeance on her father’s “killer,” and a man awaiting his assassin in a Buenos Aires guest house. The Aleph, describes a point in space that contains all other spaces at once. The work also presents the idea of infinite time. Borges writes in the original afterword, dated May 3, 1949 (Buenos Aires), that most of the stories belong to the genre of fantasy, mentioning themes such as identity and immortality. Borges added four new stories to the collection in the 1952 edition, for which he provided a brief postscript to the afterword.',
      ARRAY['Jorge Luis Borges']::TEXT[],
      'National Geographic Books',
      '2012-09-04',
      ARRAY['Fiction']::TEXT[],
      NULL,
      'https://books.google.com/books/content?id=KQCNEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      13.24,
      19.86,
      10
    ),
(
      '9500804093',
      'Conversaciones con Jorge Luis Borges',
      NULL,
      ARRAY['Jorge Luis Borges', 'Roberto Alifano']::TEXT[],
      NULL,
      '1984',
      ARRAY['Authors, Argentine']::TEXT[],
      246,
      NULL,
      7.82,
      11.73,
      19
    ),
(
      '9788408095460',
      'Marina',
      'En la Barcelona de 1980 Óscar Drai sueña despierto, deslumbrado por los palacetes modernistas cercanos al internado en el que estudia. En una de sus escapadas conoce a Marina, una chica audaz que comparte con Óscar la aventura de adentrarse en un enigma doloroso del pasado de la ciudad. Un misterioso personaje de la posguerra se propuso el mayor desafío imaginable, pero su ambición lo arrastró por sendas siniestras cuyas consecuencias debe pagar alguien todavía hoy.',
      ARRAY['Carlos Ruiz Zafón']::TEXT[],
      'Grupo Planeta Spain',
      '2010-07-12',
      ARRAY['Fiction']::TEXT[],
      248,
      'https://books.google.com/books/content?id=xkU6ERuHAhMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      13.49,
      20.23,
      13
    )
ON CONFLICT (isbn) DO NOTHING;
