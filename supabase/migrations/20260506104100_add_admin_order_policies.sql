-- Allow admins to view all orders and order items
CREATE POLICY "Admins can view all orders." ON public.orders
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can view all order items." ON public.order_items
    FOR SELECT USING (public.is_admin());
