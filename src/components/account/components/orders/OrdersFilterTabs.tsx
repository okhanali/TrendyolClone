'use client';

import { ORDER_TABS } from '@/constants';
import { OrderStatusType } from '@/types/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const OrdersFilterTabs = () => {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get('tab') as OrderStatusType) || 'all';

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide px-2 md:px-0">
        {ORDER_TABS.map((tab) => {
          const isActive = currentTab === tab.id;

          return (
            <Link
              key={tab.id}
              href={`/account/orders?tab=${tab.id}`}
              scroll={false}
              className={`
                relative py-4 px-6 text-sm font-medium transition-all duration-200 shrink-0
                ${isActive ? 'text-orange-600' : 'text-gray-500 hover:text-gray-800'}
              `}
            >
              <span className={isActive ? 'font-bold' : 'font-medium'}>{tab.label}</span>

              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.75 bg-orange-600 rounded-t-md animate-fade-in" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersFilterTabs;
