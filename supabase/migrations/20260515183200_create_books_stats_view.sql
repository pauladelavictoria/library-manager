-- Create a view for books with sales statistics
CREATE OR REPLACE VIEW books_with_stats AS
SELECT 
  b.*,
  COALESCE(SUM(oi.quantity), 0) as sold_count
FROM 
  books b
LEFT JOIN 
  order_items oi ON b.id = oi.book_id
GROUP BY 
  b.id;
