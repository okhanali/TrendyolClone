'use client';

import { auth } from '@/services/firebase';
import { createOrderService } from '@/services/orderService';
import { IPaymentState, ICartItem } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const usePayment = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (paymentDetails: IPaymentState) => {
      const user = auth.currentUser;

      if (!user) {
        throw new Error('Oturum süreniz dolmuş veya giriş yapmamışsınız.');
      }

      // 🚀 FIX: Sepeti doğrudan localStorage'dan çek (Race condition önleyici)
      const STORAGE_KEY = 'trendyol_clone_cart';
      const localData = localStorage.getItem(`${STORAGE_KEY}_${user.uid}`);
      const cartItems: ICartItem[] = localData ? JSON.parse(localData) : [];

      if (!cartItems || cartItems.length === 0) {
        throw new Error('Sepetiniz boş, ödeme yapılamaz.');
      }

      // Toplam Tutar Hesaplama
      const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

      // Sipariş Objesi Oluşturma
      const newOrder = await createOrderService({
        userId: user.uid,
        orderDate: new Date().toISOString(),
        totalAmount: totalAmount,
        status: 'continuing',
        orderNumber: `#TR-${Date.now().toString().slice(-6)}`,
        currency: 'TRY',
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.title,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          selectedVariant: item.selectedVariant,
        })),
      });

      // 🚀 FIX: Sipariş başarılıysa LOCALSTORAGE SEPETİNİ TEMİZLE
      localStorage.removeItem(`${STORAGE_KEY}_${user.uid}`);

      return newOrder;
    },

    onSuccess: (newOrder) => {
      // Query cache'lerini temizle ki sepet 0 gözüksün
      queryClient.setQueryData(['cart', auth.currentUser?.uid], []);
      queryClient.invalidateQueries({ queryKey: ['orders'] });

      toast.success(`🎉 Siparişiniz Alındı! Tutar: ${newOrder.totalAmount} TL`);

      setTimeout(() => {
        router.push(`/payment/success?orderId=${newOrder.id}`);
      }, 1500);
    },

    onError: (error: Error) => {
      console.error(error);
      toast.error(error.message || 'Ödeme sırasında bir hata oluştu');
    },
  });

  return {
    handlePayment: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
