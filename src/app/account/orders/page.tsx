import OrderSearchInput from '@/components/account/components/orders/OrderSearchInput';
import OrdersFilterTabs from '@/components/account/components/orders/OrdersFilterTabs';
import OrdersTracking from '@/components/account/components/orders/OrdersTracking';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const OrdersPage: FC<Props> = async ({ searchParams }) => {
  const cookieStore = cookies();
  const userId = (await cookieStore).get('firebase-uid')?.value;

  if (!userId) {
    redirect('/login?returnUrl=/account/orders');
  }

  const resolvedSearchParams = await searchParams;
  const activeTab = (resolvedSearchParams?.tab as string) || 'all';
  const searchQuery = (resolvedSearchParams?.q as string) || '';

  return (
    <div className="flex flex-col gap-6">
      {/* Üst Başlık ve Arama */}
      <div className="w-full bg-white p-5 shadow-sm border border-gray-200 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">Siparişlerim</h2>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <OrderSearchInput />
        </div>
      </div>

      {/* Tablar ve Liste */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <OrdersFilterTabs />

        <div className="p-0 md:p-5 bg-gray-50/50 min-h-100">
          <OrdersTracking activeStatus={activeTab} userId={userId} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
