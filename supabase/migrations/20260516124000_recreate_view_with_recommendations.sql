-- Recreate the view to include the new is_recommended column
DROP VIEW IF EXISTS books_with_stats;

CREATE VIEW books_with_stats AS
SELECT 
  b.*,
  COALESCE(SUM(oi.quantity), 0) as sold_count
FROM 
  books b
LEFT JOIN 
  order_items oi ON b.id = oi.book_id
GROUP BY 
  b.id;
