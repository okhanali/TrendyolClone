import { ICartItem } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCartItemsService = async (userId: string): Promise<ICartItem[]> => {
  if (!userId) return [];
  const res = await fetch(`${API_URL}/cart?userId=${userId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Sepet verisi alınamadı');
  return res.json();
};

export const addToCartService = async (item: ICartItem, userId: string): Promise<ICartItem> => {
  const currentCart = await getCartItemsService(userId);

  // Aynı ürünün aynı varyantı var mı?
  const existingItem = currentCart.find(
    (c) =>
      c.productId === item.productId &&
      c.selectedVariant.size === item.selectedVariant.size &&
      c.selectedVariant.color === item.selectedVariant.color
  );

  if (existingItem) {
    return await updateCartItemService(existingItem.id, existingItem.quantity + 1);
  }

  const res = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, userId }),
  });

  if (!res.ok) throw new Error('Ekleme başarısız');
  return res.json();
};

export const updateCartItemService = async (id: string, quantity: number): Promise<ICartItem> => {
  const res = await fetch(`${API_URL}/cart/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error('Güncelleme başarısız');
  return res.json();
};

export const removeFromCartService = async (id: string) => {
  const res = await fetch(`${API_URL}/cart/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Silme başarısız');
  return res.json();
};
