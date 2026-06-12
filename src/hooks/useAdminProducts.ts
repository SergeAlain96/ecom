import { useEffect, useState, useCallback } from 'react';
import { supabase, type Product } from '../lib/supabase';

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else setProducts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const toggleActive = async (id: string, currentValue: boolean) => {
    const { error: err } = await supabase
      .from('products')
      .update({ is_active: !currentValue })
      .eq('id', id);
    if (!err) setProducts(prev => prev.map(p => p.id === id ? { ...p, is_active: !currentValue } : p));
    return err;
  };

  const deleteProduct = async (id: string) => {
    const { error: err } = await supabase.from('products').delete().eq('id', id);
    if (!err) setProducts(prev => prev.filter(p => p.id !== id));
    return err;
  };

  const saveProduct = async (data: Omit<Product, 'id' | 'created_at'>, id?: string) => {
    if (id) {
      const { error: err } = await supabase.from('products').update(data).eq('id', id);
      if (!err) await fetch();
      return err;
    }
    const { error: err } = await supabase.from('products').insert(data);
    if (!err) await fetch();
    return err;
  };

  return { products, loading, error, toggleActive, deleteProduct, saveProduct, refetch: fetch };
}
