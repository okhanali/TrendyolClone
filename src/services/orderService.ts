import { ICartItem, IOrder, OrderStatusType } from '@/types/types';

const ORDERS_STORAGE_KEY = 'trendyol_clone_orders';
const CART_STORAGE_KEY = 'trendyol_clone_cart';

/**
 * Kullanıcıya özel sepeti LocalStorage'dan çeker.
 */
export const getCartItemService = async (userId: string): Promise<ICartItem[]> => {
  if (typeof window === 'undefined' || !userId) return [];
  const data = localStorage.getItem(`${CART_STORAGE_KEY}_${userId}`);
  return data ? JSON.parse(data) : [];
};

/**
 * Sipariş tamamlandıktan sonra LocalStorage'daki sepeti temizler.
 */
export const clearCartService = async (userId: string): Promise<void> => {
  if (typeof window === 'undefined' || !userId) return;
  localStorage.removeItem(`${CART_STORAGE_KEY}_${userId}`);
  return new Promise((resolve) => setTimeout(resolve, 100));
};

/**
 * Siparişleri LocalStorage'dan getirir ve tarihe göre sıralar.
 */
export const getOrdersService = async (
  userId: string,
  status: OrderStatusType | 'all'
): Promise<IOrder[]> => {
  if (typeof window === 'undefined' || !userId) return [];

  const data = localStorage.getItem(`${ORDERS_STORAGE_KEY}_${userId}`);
  let orders: IOrder[] = data ? JSON.parse(data) : [];

  // Status Filtresi
  if (status && status !== 'all') {
    orders = orders.filter((o) => o.status === status);
  }

  // En yeni sipariş en üstte görünsün
  return orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
};

/**
 * Yeni siparişi LocalStorage'daki siparişler dizisine kalıcı olarak ekler.
 */
export const createOrderService = async (orderData: Omit<IOrder, 'id'>): Promise<IOrder> => {
  const userId = orderData.userId;
  const newOrder = {
    ...orderData,
    id: crypto.randomUUID(),
  } as IOrder;

  if (typeof window !== 'undefined' && userId) {
    const data = localStorage.getItem(`${ORDERS_STORAGE_KEY}_${userId}`);
    const existingOrders: IOrder[] = data ? JSON.parse(data) : [];

    // Yeni siparişi listenin başına ekle
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem(`${ORDERS_STORAGE_KEY}_${userId}`, JSON.stringify(updatedOrders));

    // Sepeti de burada temizleyelim (Garanti olsun)
    localStorage.removeItem(`${CART_STORAGE_KEY}_${userId}`);
  }

  return new Promise((resolve) => setTimeout(() => resolve(newOrder), 400));
};
