'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
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
  const { user, loading: isAuthLoading } = useAuth();

  const { data: cartItems, isLoading: isQueryLoading } = useQuery({
    queryKey: ['cart', user?.uid],
    queryFn: () => getCartItemsService(user?.uid as string),
    staleTime: 1000 * 60,
    enabled: !!user?.uid,
  });

  const addMutation = useMutation({
    mutationFn: (item: ICartItem) => addToCartService(item, user?.uid as string),
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
    toast.success('Ürün sepete eklendi!');
  };

  // 🔥 BUILD HATASINI ÇÖZEN VE ÖDEMEYE YÖNLENDİREN FONKSİYON
  const buyNowSingleItem = async (item: ICartItem) => {
    if (!user) {
      toast.warn('Satın almak için giriş yapmalısınız.');
      router.push('/login');
      return;
    }
    try {
      await addMutation.mutateAsync(item);
      router.push('/cart'); // Önce sepeti doğrula sonra ödemeye geçmek en sağlıklısıdır
    } catch (error) {
      toast.error('İşlem başarısız oldu.');
    }
  };

  const proceedToCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error('Sepetiniz boş!');
      return;
    }
    router.push('/payment');
  };

  return {
    cartItems: cartItems || [],
    addToCart,
    buyNowSingleItem, // 🚀 TypeScript hatasını burası çözüyor
    removeFromCart: (id: string) => {
      if (!user?.uid) return;
      removeFromCartService(id, user.uid).then(() => {
        queryClient.invalidateQueries({ queryKey: ['cart', user.uid] });
      });
    },
    updateQuantity: (id: string, q: number) => {
      if (!user?.uid) return;
      updateCartItemService(id, q, user.uid).then(() => {
        queryClient.invalidateQueries({ queryKey: ['cart', user.uid] });
      });
    },
    proceedToCheckout,
    isLoading: isAuthLoading || isQueryLoading || addMutation.isPending,
  };
};
