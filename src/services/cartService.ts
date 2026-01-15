import { ICartItem } from '@/types/types';
import dbData from '../../db.json';

// Sepeti Getir
export const getCartItemsService = async (userId: string): Promise<ICartItem[]> => {
  if (!userId) return [];
  const cart = (dbData.cart as unknown as ICartItem[]) || [];
  const userCart = cart.filter((c) => c.userId === userId);

  return new Promise((resolve) => setTimeout(() => resolve(userCart), 100));
};

// Sepete Ekle (MOCK)
export const addToCartService = async (item: ICartItem, userId: string): Promise<ICartItem> => {
  return new Promise((resolve) => {
    console.log('Sepete eklendi (Simülasyon):', item);
    setTimeout(() => resolve(item), 200);
  });
};

// Miktar Güncelle
export const updateCartItemService = async (id: string, quantity: number): Promise<ICartItem> => {
  return new Promise((resolve) => {
    const mockItem = { id, quantity } as any;
    setTimeout(() => resolve(mockItem), 100);
  });
};

// Sepetten Sil
export const removeFromCartService = async (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 100);
  });
};
