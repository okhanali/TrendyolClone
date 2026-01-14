import PaymentForm from '@/components/payment/PaymentForm';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Güvenli Ödeme | Trendyol Clone',
  description: 'Siparişinizi 256-bit SSL güvencesiyle tamamlayın.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Güvenli Ödeme',
    description: 'Ödemenizi güvenle tamamlayın.',
    type: 'website',
  },
};

const PaymentPage: FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-start sm:items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <PaymentForm />
    </div>
  );
};

export default PaymentPage;
