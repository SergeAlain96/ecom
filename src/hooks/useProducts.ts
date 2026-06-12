import { useEffect, useState, useCallback } from 'react';
import { supabase, type Product } from '../lib/supabase';

interface Filters {
  search?: string;
  categoryId?: string;
  onlyFeatured?: boolean;
  onlyActive?: boolean;
}

export function useProducts(filters: Filters = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('products').select('*').order('created_at', { ascending: false });

    if (filters.onlyActive !== false) query = query.eq('is_active', true);
    if (filters.onlyFeatured)        query = query.eq('is_featured', true);
    if (filters.categoryId)          query = query.eq('category_id', filters.categoryId);
    if (filters.search)              query = query.ilike('name', `%${filters.search}%`);

    const { data, error: err } = await query;
    if (err) setError(err.message);
    else setProducts(data ?? []);
    setLoading(false);
  }, [filters.search, filters.categoryId, filters.onlyFeatured, filters.onlyActive]);

  useEffect(() => { fetch(); }, [fetch]);

  return { products, loading, error, refetch: fetch };
}

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setProduct(data);
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
}
