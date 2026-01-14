import PaymentSuccessCard from '@/components/payment/PaymentSuccessCard';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Sipariş Başarılı | Trendyol Clone',
  description: 'Siparişiniz başarıyla alındı. Teşekkür ederiz.',
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = 'force-dynamic';

const PaymentSuccessPage: FC<Props> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams.orderId;

  if (!orderId || typeof orderId !== 'string') {
    redirect('/');
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4 py-8 sm:py-12">
      <PaymentSuccessCard orderId={orderId} />
    </main>
  );
};

export default PaymentSuccessPage;
