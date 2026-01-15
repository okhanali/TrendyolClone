'use client';

import { useEffect, useState, useMemo } from 'react';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const { data: cartItems, isLoading: isQueryLoading } = useQuery({
    queryKey: ['cart', user?.uid],
    queryFn: () => getCartItemsService(user?.uid as string),
    enabled: !isAuthLoading && !!user?.uid,
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca cache'i taze kabul et
  });

  // --- MUTATIONS ---

  const addMutation = useMutation({
    mutationFn: (item: ICartItem) => {
      if (!user?.uid) throw new Error('Oturum kapalı');
      return addToCartService(item, user.uid);
    },
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['cart', user?.uid] });
      const previousCart = queryClient.getQueryData<ICartItem[]>(['cart', user?.uid]);

      queryClient.setQueryData<ICartItem[]>(['cart', user?.uid], (old = []) => {
        const existing = old.find(
          (i) =>
            i.productId === newItem.productId &&
            i.selectedVariant?.size === newItem.selectedVariant?.size
        );
        if (existing) {
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
    onSuccess: () => toast.success('Ürün sepete eklendi!'),
    onError: (err, newItem, context) => {
      queryClient.setQueryData(['cart', user?.uid], context?.previousCart);
      toast.error('Eklenemedi.');
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] }),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => removeFromCartService(id, user?.uid as string),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['cart', user?.uid] });
      const previousCart = queryClient.getQueryData<ICartItem[]>(['cart', user?.uid]);
      queryClient.setQueryData<ICartItem[]>(['cart', user?.uid], (old = []) =>
        old.filter((item) => String(item.id) !== String(id))
      );
      return { previousCart };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['cart', user?.uid], context?.previousCart);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCartItemService(id, quantity, user?.uid as string),
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart', user?.uid] });
      const previousCart = queryClient.getQueryData<ICartItem[]>(['cart', user?.uid]);
      queryClient.setQueryData<ICartItem[]>(['cart', user?.uid], (old = []) =>
        old.map((item) => (String(item.id) === String(id) ? { ...item, quantity } : item))
      );
      return { previousCart };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] }),
  });

  // --- ACTIONS ---

  const addToCart = (item: ICartItem) => {
    if (!user) {
      toast.warn('Lütfen giriş yapın.');
      router.push('/login');
      return;
    }
    addMutation.mutate(item);
  };

  const removeFromCart = (id: string) => id && removeMutation.mutate(id);

  const updateQuantity = (id: string, quantity: number) => {
    if (!id || quantity < 1) return;
    updateMutation.mutate({ id, quantity });
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
    proceedToCheckout,
    user,
    isLoading: isAuthLoading || isQueryLoading || addMutation.isPending,
  };
};
