'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { onAuthStateChanged, User } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '@/services/firebase';
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

  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Kullanıcıya özel sepet verilerini çek
  const { data: cartItems, isLoading: isQueryLoading } = useQuery({
    queryKey: ['cart', user?.uid],
    queryFn: () => getCartItemsService(user?.uid as string),
    staleTime: 1000 * 60 * 5,
    enabled: !isAuthLoading && !!user?.uid,
  });

  // --- MUTATIONS ---

  // Sepete Ekleme
  const addMutation = useMutation({
    mutationFn: (item: ICartItem) => {
      if (!user?.uid) throw new Error('Auth required');
      return addToCartService(item, user.uid);
    },
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['cart', user?.uid] });

      const previousCart = queryClient.getQueryData<ICartItem[]>(['cart', user?.uid]);

      queryClient.setQueryData<ICartItem[]>(['cart', user?.uid], (old = []) => {
        const existingItem = old.find(
          (i) =>
            i.productId === newItem.productId &&
            i.selectedVariant?.size === newItem.selectedVariant?.size
        );

        if (existingItem) {
          return old.map((i) =>
            i.productId === newItem.productId &&
            i.selectedVariant?.size === newItem.selectedVariant?.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...old, { ...newItem, quantity: 1 }];
      });

      return { previousCart };
    },
    onSuccess: () => {
      toast.success('Ürün sepete eklendi!', { autoClose: 1500 });
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(['cart', user?.uid], context?.previousCart);
      toast.error('Sepete eklenemedi.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
    },
  });

  // Sepetten Silme
  const removeMutation = useMutation({
    mutationFn: (id: string) => removeFromCartService(id),
    onMutate: async (id) => {
      const queryKey = ['cart', user?.uid];
      await queryClient.cancelQueries({ queryKey });
      const previousCart = queryClient.getQueryData<ICartItem[]>(queryKey);

      queryClient.setQueryData<ICartItem[]>(queryKey, (oldCart) => {
        if (!oldCart) return [];
        return oldCart.filter((item) => String(item.id) !== String(id));
      });

      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(['cart', user?.uid], context?.previousCart);
      toast.error('Ürün silinemedi.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
    },
  });

  // Miktar Güncelleme
  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCartItemService(id, quantity),
    onMutate: async ({ id, quantity }) => {
      const queryKey = ['cart', user?.uid];
      await queryClient.cancelQueries({ queryKey });
      const previousCart = queryClient.getQueryData<ICartItem[]>(queryKey);

      queryClient.setQueryData<ICartItem[]>(queryKey, (oldCart) => {
        if (!oldCart) return [];
        return oldCart.map((item) =>
          String(item.id) === String(id) ? { ...item, quantity } : item
        );
      });

      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(['cart', user?.uid], context?.previousCart);
      toast.error('Miktar güncellenemedi.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
    },
  });

  // --- ACTIONS  ---

  const addToCart = (item: ICartItem) => {
    if (!user) {
      toast.warn('Sepete eklemek için giriş yapmalısınız.');
      router.push('/login');
      return;
    }
    addMutation.mutate(item);
  };

  const removeFromCart = (id: string) => {
    if (!id) return;
    removeMutation.mutate(id);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (!id || quantity < 1) return;
    updateMutation.mutate({ id, quantity });
  };

  const buyNowSingleItem = async (item: ICartItem) => {
    if (!user) {
      toast.warn('Satın almak için giriş yapmalısınız.');
      router.push('/login');
      return;
    }

    try {
      const promise = addMutation.mutateAsync(item);
      toast.promise(promise, {
        pending: 'Hazırlanıyor...',
        success: 'Ödeme sayfasına yönlendiriliyorsunuz!',
        error: 'Bir hata oluştu.',
      });

      await promise;
      router.push('/payment');
    } catch (error) {
      console.error('Buy Now Error:', error);
    }
  };

  const proceedToCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      toast.warn('Sepetiniz boş!');
      return;
    }
    router.push('/payment');
  };

  return {
    cartItems: cartItems || [],
    addToCart,
    removeFromCart,
    updateQuantity,
    buyNowSingleItem,
    proceedToCheckout,
    user,
    isLoading:
      isAuthLoading ||
      isQueryLoading ||
      addMutation.isPending ||
      removeMutation.isPending ||
      updateMutation.isPending,
  };
};
