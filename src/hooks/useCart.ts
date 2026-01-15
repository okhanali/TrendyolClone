'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth'; // Merkezi auth'u kullan
import {
  addToCartService,
  getCartItemsService,
  removeFromCartService,
  updateCartItemService,
} from '@/services/cartService';
import { ICartItem } from '@/types/types';

export const useCart = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user, loading: isAuthLoading } = useAuth(); // useAuth'dan çek

  const { data: cartItems, isLoading: isQueryLoading } = useQuery({
    queryKey: ['cart', user?.uid],
    queryFn: () => getCartItemsService(user?.uid as string),
    staleTime: 1000 * 60, // 1 dakika cache
    enabled: !!user?.uid, // Sadece user varsa çalışır
  });

  const addMutation = useMutation({
    mutationFn: (item: ICartItem) => addToCartService(item, user?.uid as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
      toast.success('Ürün sepete eklendi!');
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => removeFromCartService(id, user?.uid as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCartItemService(id, quantity, user?.uid as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
    },
  });

  const addToCart = (item: ICartItem) => {
    if (!user) {
      toast.warn('Giriş yapmalısınız.');
      router.push('/login');
      return;
    }
    addMutation.mutate(item);
  };

  const proceedToCheckout = () => {
    // 🔥 FIX: LocalStorage'dan kontrol ederek garantiye alıyoruz
    if (!cartItems || cartItems.length === 0) {
      toast.error('Sepetiniz boş görünüyor!');
      return;
    }
    router.push('/payment');
  };

  return {
    cartItems: cartItems || [],
    addToCart,
    removeFromCart: (id: string) => removeMutation.mutate(id),
    updateQuantity: (id: string, q: number) => updateMutation.mutate({ id, quantity: q }),
    proceedToCheckout,
    isLoading: isAuthLoading || isQueryLoading,
  };
};
