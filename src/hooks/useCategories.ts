import { useEffect, useState } from 'react';
import { supabase, type Category } from '../lib/supabase';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('name')
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setCategories(data ?? []);
        setLoading(false);
      });
  }, []);

  return { categories, loading, error };
}
