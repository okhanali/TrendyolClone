'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, FormEvent, useState } from 'react';

const OrderSearchInput: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('q') || '');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const currentTab = searchParams.get('tab') || 'all';
    router.push(`/account/orders?tab=${currentTab}&q=${encodeURIComponent(term)}`);
  };
  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        placeholder="Sipariş no veya ürün ara"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full h-10 pl-4 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all bg-gray-50 focus:bg-white"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default OrderSearchInput;
