'use client';

import { getOrdersService } from '@/services/orderService';
import { IOrder, OrderStatusType } from '@/types/types';
import { Loader2, PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import OrderCard from './OrderCard';

interface Props {
  activeStatus: string;
  userId: string;
  searchQuery?: string;
}

const OrdersTracking: FC<Props> = ({ activeStatus, userId, searchQuery }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        setOrders([]);
        setError(null);

        const data = await getOrdersService(userId, activeStatus as OrderStatusType);

        let filteredData = data;

        if (searchQuery) {
          const lowerQ = searchQuery.toLowerCase();

          filteredData = data.filter((order) => {
            //  Sipariş Numarası Kontrolü
            const orderNumStr = (order.orderNumber || '').toLowerCase();
            const isOrderNumMatch = orderNumStr.includes(lowerQ);

            // Ürün İsimleri Kontrolü
            const isItemMatch = (order.items || []).some((item: any) => {
              const pName = (item.productName || item.title || '').toLowerCase();
              return pName.includes(lowerQ);
            });

            return isOrderNumMatch || isItemMatch;
          });
        }

        setOrders(filteredData);
      } catch (error) {
        console.error(error);
        setError('Siparişler yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeStatus, userId, searchQuery]);

  if (isLoading)
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-orange-600 w-8 h-8" />
        <span className="text-sm text-gray-500 font-medium">Siparişleriniz yükleniyor...</span>
      </div>
    );

  if (error) {
    return (
      <div className="py-10 text-center text-red-500 bg-red-50 rounded-lg border border-red-100">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-dashed border-gray-300 rounded-xl">
        <div className="bg-orange-50 p-4 rounded-full mb-4">
          <PackageOpen className="w-10 h-10 text-orange-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Sipariş Bulunamadı</h3>
        <p className="text-gray-500 mb-6 text-sm max-w-xs">
          {searchQuery
            ? `"${searchQuery}" aramasına uygun sipariş bulunamadı.`
            : 'Bu kategoride henüz bir siparişiniz bulunmuyor.'}
        </p>
        <Link
          href="/"
          className="bg-orange-600 text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-orange-700 transition-colors shadow-sm"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersTracking;
