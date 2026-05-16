export interface Book {
  id: string;
  isbn: string | null;
  title: string;
  description: string | null;
  authors: string[] | null;
  publisher: string | null;
  published_date: string | null;
  categories: string[] | null;
  page_count: number | null;
  cover_url: string | null;
  cost_price: number | null;
  selling_price: number | null;
  stock_quantity: number;
  sold_count: number;
  reorder_threshold: number;
  created_at: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discount_amount: number;
  expiry_date: string;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  updated_at: string;
  created_at: string;
}
