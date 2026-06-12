import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ────────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  detailed_description: string;
  category_id: string;
  images: string[];
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  has_promo: boolean;
  promo_text?: string;
  characteristics?: string[];
  created_at?: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  product_id: string;
  product_name: string;
  quantity: number;
  total_amount: number;
  delivery_address?: string;
  comment?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  city: string;
  total_orders: number;
  created_at: string;
}

export interface ShopSettings {
  id: string;
  shop_name: string;
  whatsapp_number: string;
  logo_url?: string;
  banner_images: string[];
  social_media: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}
