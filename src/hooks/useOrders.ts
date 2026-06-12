import { useEffect, useState, useCallback } from 'react';
import { supabase, type Order } from '../lib/supabase';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else setOrders(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const updateStatus = async (id: string, status: Order['status']) => {
    const { error: err } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    if (!err) setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    return err;
  };

  return { orders, loading, error, refetch: fetch, updateStatus };
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>) {
  return supabase.from('orders').insert(order).select().single();
}

export async function upsertCustomer(name: string, phone: string, city: string) {
  const { data: existing } = await supabase
    .from('customers')
    .select('id, total_orders')
    .eq('phone', phone)
    .single();

  if (existing) {
    await supabase
      .from('customers')
      .update({ total_orders: existing.total_orders + 1, name, city })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('customers')
      .insert({ name, phone, city, total_orders: 1 });
  }
}
