import { ICartItem } from '@/types/types';

const STORAGE_KEY = 'trendyol_clone_cart';

const getLocalCart = (userId: string): ICartItem[] => {
  if (typeof window === 'undefined' || !userId) return [];
  const data = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
  return data ? JSON.parse(data) : [];
};

const saveLocalCart = (userId: string, cart: ICartItem[]) => {
  if (typeof window === 'undefined' || !userId) return;
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(cart));
};

export const getCartItemsService = async (userId: string): Promise<ICartItem[]> => {
  if (!userId) return [];
  return getLocalCart(userId); // setTimeout'u kaldırdık, PC rahatlasın
};

export const addToCartService = async (item: ICartItem, userId: string): Promise<ICartItem> => {
  const cart = getLocalCart(userId);
  const existingIndex = cart.findIndex(
    (i) => i.productId === item.productId && i.selectedVariant?.size === item.selectedVariant?.size
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    // Benzersiz ID oluştur (Payment sayfasında çakışma olmaması için)
    cart.push({ ...item, id: `${Date.now()}-${item.productId}`, quantity: 1 });
  }

  saveLocalCart(userId, cart);
  return item;
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
  return { success: true };
};
