import { ICartItem, IOrder, OrderStatusType } from '@/types/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Sepetteki Ürünleri Al
export const getCartItemService = async (userId: string): Promise<ICartItem[]> => {
  if (!userId) return [];

  const res = await fetch(`${BASE_URL}/cart?userId=${userId}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Sepet verisi alınamadı');
  return (await res.json()) as ICartItem[];
};

// Sepeti Temizle
export const clearCartService = async (cartItems: ICartItem[]): Promise<void> => {
  if (!cartItems || cartItems.length === 0) return;

  const deletePromise = cartItems.map((item) =>
    fetch(`${BASE_URL}/cart/${item.id}`, {
      method: 'DELETE',
    })
  );

  await Promise.all(deletePromise);
};

// Siparişleri Getir
export const getOrdersService = async (
  userId: string,
  status: OrderStatusType
): Promise<IOrder[]> => {
  const params = new URLSearchParams();
  params.append('userId', userId);

  if (status && status !== 'all') {
    params.append('status', status);
  }

  const res = await fetch(`${BASE_URL}/orders?${params.toString()}`, {
    cache: 'no-store',
    headers: { Pragma: 'no-cache' },
  });

  if (!res.ok) throw new Error('Siparişler getirilemedi');
  return (await res.json()) as IOrder[];
};

// Sipariş Oluştur
export const createOrderService = async (orderData: Omit<IOrder, 'id'>): Promise<IOrder> => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...orderData,
      id: crypto.randomUUID(),
    }),
  });

  if (!res.ok) throw new Error('Sipariş oluşturulamadı');
  return (await res.json()) as IOrder;
};
