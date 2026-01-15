import { ICartItem } from '@/types/types';

const STORAGE_KEY = 'trendyol_clone_cart';

// Yardımcı: LocalStorage'dan oku
const getLocalCart = (userId: string): ICartItem[] => {
  if (typeof window === 'undefined' || !userId) return [];
  const data = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
  return data ? JSON.parse(data) : [];
};

// Yardımcı: LocalStorage'a yaz
const saveLocalCart = (userId: string, cart: ICartItem[]) => {
  if (typeof window === 'undefined' || !userId) return;
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(cart));
};

export const getCartItemsService = async (userId: string): Promise<ICartItem[]> => {
  if (!userId) return [];
  const userCart = getLocalCart(userId);
  return new Promise((resolve) => setTimeout(() => resolve(userCart), 100));
};

export const addToCartService = async (item: ICartItem, userId: string): Promise<ICartItem> => {
  const cart = getLocalCart(userId);

  // Aynı ürün ve aynı varyant (beden/renk) kontrolü
  const existingIndex = cart.findIndex(
    (i) => i.productId === item.productId && i.selectedVariant?.size === item.selectedVariant?.size
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += item.quantity || 1;
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
  }

  saveLocalCart(userId, cart);
  return new Promise((resolve) => setTimeout(() => resolve(item), 150));
};

export const updateCartItemService = async (
  id: string,
  quantity: number,
  userId: string
): Promise<void> => {
  const cart = getLocalCart(userId);
  const updatedCart = cart.map((item) =>
    String(item.id) === String(id) ? { ...item, quantity } : item
  );
  saveLocalCart(userId, updatedCart);
};

export const removeFromCartService = async (id: string, userId: string) => {
  const cart = getLocalCart(userId);
  const updatedCart = cart.filter((item) => String(item.id) !== String(id));
  saveLocalCart(userId, updatedCart);
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100));
};
