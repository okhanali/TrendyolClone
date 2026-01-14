import { auth } from '@/services/firebase';
import { clearCartService, getCartItemService, createOrderService } from '@/services/orderService';
import { IPaymentState } from '@/types/types';
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

      //  Sepeti Çek
      const cartItems = await getCartItemService(user.uid);

      if (!cartItems || cartItems.length === 0) {
        throw new Error('Sepetiniz boş, ödeme yapılamaz.');
      }

      //Toplam Tutar
      const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

      // Sipariş Objesi
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

      //Sepeti Temizle
      await clearCartService(cartItems);

      return newOrder;
    },

    onSuccess: (newOrder) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });

      toast.success(`🎉 Siparişiniz Alındı! Tutar: ${newOrder.totalAmount} TL`);

      setTimeout(() => {
        router.push(`/payment/success?orderId=${newOrder.id}`);
      }, 1500);
    },

    onError: (error: Error) => {
      console.error(error);
      toast.error(error.message || 'Ödeme sırasında bir hata oluştu');

      if (error.message.includes('Oturum') || error.message.includes('giriş')) {
        setTimeout(() => router.push('/login'), 1500);
      }
    },
  });

  return {
    handlePayment: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
