-- Create a view for order subtotals (before discount)
CREATE OR REPLACE VIEW order_subtotals AS
SELECT 
    order_id, 
    SUM(price_at_purchase * quantity) as subtotal
FROM 
    order_items
GROUP BY 
    order_id;

-- Create a view for promo performance statistics
CREATE OR REPLACE VIEW promo_performance AS
SELECT 
    p.*,
    COUNT(o.id) as usage_count,
    COALESCE(SUM(o.total_amount), 0) as total_revenue,
    COALESCE(SUM(GREATEST(0, s.subtotal - o.total_amount)), 0) as total_discount
FROM 
    promo_codes p
LEFT JOIN 
    orders o ON p.code = o.promo_code
LEFT JOIN 
    order_subtotals s ON o.id = s.order_id
GROUP BY 
    p.id;
