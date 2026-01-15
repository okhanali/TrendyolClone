import { ICartItem, IOrder, OrderStatusType } from '@/types/types';
import dbData from '../../db.json';

export const getCartItemService = async (userId: string): Promise<ICartItem[]> => {
  if (!userId) return [];
  const cart = (dbData.cart as unknown as ICartItem[]) || [];

  // Kullanıcıya göre filtrele
  const userCart = cart.filter((c) => c.userId === userId);

  return new Promise((resolve) => setTimeout(() => resolve(userCart), 100));
};

// Sepeti Temizle
export const clearCartService = async (cartItems: ICartItem[]): Promise<void> => {
  return new Promise((resolve) => {
    console.log('Sepet temizlendi (Simülasyon)');
    setTimeout(() => resolve(), 200);
  });
};

// Siparişleri Getir
export const getOrdersService = async (
  userId: string,
  status: OrderStatusType
): Promise<IOrder[]> => {
  let orders = (dbData.orders as unknown as IOrder[]) || [];

  // User Filtresi
  orders = orders.filter((o) => o.userId === userId);

  // Status Filtresi
  if (status && status !== 'all') {
    orders = orders.filter((o) => o.status === status);
  }

  return new Promise((resolve) => setTimeout(() => resolve(orders), 100));
};

// Sipariş Oluştur
export const createOrderService = async (orderData: Omit<IOrder, 'id'>): Promise<IOrder> => {
  const newOrder = {
    ...orderData,
    id: crypto.randomUUID(),
  };

  return new Promise((resolve) => {
    console.log('Sipariş oluşturuldu (Simülasyon):', newOrder);
    setTimeout(() => resolve(newOrder as IOrder), 500);
  });
};
