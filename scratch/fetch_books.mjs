import fs from 'fs';

async function fetchBooks() {
  const queries = ['gabriel garcia marquez', 'j k rowling', 'george r r martin', 'isabel allende', 'stephen king', 'agatha christie', 'tolkien', 'borges', 'carlos ruiz zafon', 'ken follett', 'julia navarro', 'laura gallego', 'brandon sanderson'];
  let allBooks = [];
  let isbnsSet = new Set();
  
  for (const q of queries) {
    if (allBooks.length >= 100) break;
    for (let startIndex = 0; startIndex < 80; startIndex += 40) {
      if (allBooks.length >= 100) break;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=40&startIndex=${startIndex}&langRestrict=es`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.items) break;
      
      for (const item of data.items) {
        if (allBooks.length >= 100) break;
        
        let isbn = null;
        if (item.volumeInfo.industryIdentifiers) {
          const isbns = item.volumeInfo.industryIdentifiers.filter(id => id.type === 'ISBN_13' || id.type === 'ISBN_10');
          if (isbns.length > 0) {
            isbn = isbns[0].identifier;
          }
        }
        if (isbn) {
          if (isbnsSet.has(isbn)) continue;
          isbnsSet.add(isbn);
          allBooks.push(item);
        }
      }
    }
  }

  let sql = `-- Seed data generado desde Google Books API\n\n`;

  const authorsSet = new Set();
  const categoriesSet = new Set();
  const publishersSet = new Set();

  const escapeSql = (str) => {
    if (!str) return 'NULL';
    return "'" + String(str).replace(/'/g, "''") + "'";
  };

  const escapeArray = (arr) => {
    if (!arr || arr.length === 0) return 'NULL';
    return "ARRAY[" + arr.map(escapeSql).join(", ") + "]::TEXT[]";
  };

  let bookInserts = [];

  for (const item of allBooks) {
    const vol = item.volumeInfo;
    
    let isbn = null;
    if (vol.industryIdentifiers) {
      const isbns = vol.industryIdentifiers.filter(id => id.type === 'ISBN_13' || id.type === 'ISBN_10');
      if (isbns.length > 0) {
        isbn = isbns[0].identifier;
      }
    }

    const title = escapeSql(vol.title);
    const description = escapeSql(vol.description);
    const publisher = escapeSql(vol.publisher);
    const publishedDate = escapeSql(vol.publishedDate);
    const pageCount = vol.pageCount || 'NULL';
    // Forzamos HTTPS para las URLs de las portadas
    const coverUrl = escapeSql(vol.imageLinks?.thumbnail?.replace('http:', 'https:'));

    const authorsArr = vol.authors || [];
    const categoriesArr = vol.categories || [];
    
    authorsArr.forEach(a => authorsSet.add(a));
    categoriesArr.forEach(c => categoriesSet.add(c));
    if (vol.publisher) publishersSet.add(vol.publisher);

    const authorsSql = escapeArray(authorsArr);
    const categoriesSql = escapeArray(categoriesArr);

    // Precios de costo simulados entre 5 y 15 euros/dolares
    const costPrice = (Math.random() * 10 + 5).toFixed(2);
    // Precio de venta calculado con un 50% de margen
    const sellingPrice = (parseFloat(costPrice) * 1.5).toFixed(2);
    // Cantidad en stock aleatoria entre 5 y 25
    const stockQuantity = Math.floor(Math.random() * 20) + 5;

    bookInserts.push(`(
      ${isbn ? escapeSql(isbn) : 'NULL'},
      ${title},
      ${description},
      ${authorsSql},
      ${publisher},
      ${publishedDate},
      ${categoriesSql},
      ${pageCount},
      ${coverUrl},
      ${costPrice},
      ${sellingPrice},
      ${stockQuantity}
    )`);
  }

  // Insertar Autores (sin ON CONFLICT porque no hay UNIQUE constraint en name por defecto, pero el Set nos asegura unicidad aquí)
  sql += `-- Insertar Autores\n`;
  Array.from(authorsSet).forEach(a => {
    sql += `INSERT INTO authors (name) VALUES (${escapeSql(a)});\n`;
  });
  sql += `\n`;

  // Insertar Categorías
  sql += `-- Insertar Categorías\n`;
  Array.from(categoriesSet).forEach(c => {
    sql += `INSERT INTO categories (name) VALUES (${escapeSql(c)}) ON CONFLICT (name) DO NOTHING;\n`;
  });
  sql += `\n`;

  // Insertar Editoriales
  sql += `-- Insertar Editoriales\n`;
  Array.from(publishersSet).forEach(p => {
    sql += `INSERT INTO publishers (name) VALUES (${escapeSql(p)}) ON CONFLICT (name) DO NOTHING;\n`;
  });
  sql += `\n`;

  // Insertar Libros
  sql += `-- Insertar Libros\n`;
  sql += `INSERT INTO books (isbn, title, description, authors, publisher, published_date, categories, page_count, cover_url, cost_price, selling_price, stock_quantity) VALUES \n`;
  sql += bookInserts.join(",\n") + "\nON CONFLICT (isbn) DO NOTHING;\n";

  fs.writeFileSync('supabase/seed.sql', sql);
  console.log('Seed file (supabase/seed.sql) creado con éxito con ' + allBooks.length + ' libros.');
}

fetchBooks().catch(console.error);
