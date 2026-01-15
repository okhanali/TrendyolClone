import { ICartItem } from '@/types/types';

const STORAGE_KEY = 'trendyol_clone_cart';

/**
 * LocalStorage'dan kullanıcıya özel sepeti okur.
 */
const getLocalCart = (userId: string): ICartItem[] => {
  if (typeof window === 'undefined' || !userId) return [];
  const data = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
  return data ? JSON.parse(data) : [];
};

/**
 * LocalStorage'a kullanıcıya özel sepeti kaydeder.
 */
const saveLocalCart = (userId: string, cart: ICartItem[]) => {
  if (typeof window === 'undefined' || !userId) return;
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(cart));
};

export const getCartItemsService = async (userId: string): Promise<ICartItem[]> => {
  if (!userId) return [];
  const userCart = getLocalCart(userId);
  // Ağ gecikmesini simüle etmek için küçük bir timeout
  return new Promise((resolve) => setTimeout(() => resolve(userCart), 150));
};

export const addToCartService = async (item: ICartItem, userId: string): Promise<ICartItem> => {
  const cart = getLocalCart(userId);

  // Aynı ürün ve aynı beden var mı kontrol et
  const existingIndex = cart.findIndex(
    (i) => i.productId === item.productId && i.selectedVariant.size === item.selectedVariant.size
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += item.quantity || 1;
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
  }

  saveLocalCart(userId, cart);
  return new Promise((resolve) => setTimeout(() => resolve(item), 200));
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
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 150));
};
