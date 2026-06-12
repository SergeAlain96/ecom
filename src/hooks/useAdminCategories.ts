import { useEffect, useState, useCallback } from 'react';
import { supabase, type Category } from '../lib/supabase';

export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (err) setError(err.message);
    else setCategories(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const save = async (data: Omit<Category, 'id' | 'created_at'>, id?: string) => {
    if (id) {
      const { error: err } = await supabase.from('categories').update(data).eq('id', id);
      if (!err) await fetch();
      return err;
    }
    const { error: err } = await supabase.from('categories').insert(data);
    if (!err) await fetch();
    return err;
  };

  const remove = async (id: string) => {
    const { error: err } = await supabase.from('categories').delete().eq('id', id);
    if (!err) setCategories(prev => prev.filter(c => c.id !== id));
    return err;
  };

  return { categories, loading, error, save, remove, refetch: fetch };
}
