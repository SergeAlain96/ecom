import { useEffect, useState, useCallback } from 'react';
import { supabase, type Customer } from '../lib/supabase';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else setCustomers(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { customers, loading, error, refetch: fetch };
}
