'use client';

import { FC, useMemo } from 'react';
import { IProducts } from '@/types/types';
import Link from 'next/link';

interface Props {
  products: IProducts[];
}

const YouInterestedHeadSlider: FC<Props> = ({ products }) => {
  if (!products || products.length === 0) return null;

  const uniqueBrands = useMemo(() => {
    const brands = products.map((p) => p.brandName).filter(Boolean);
    return Array.from(new Set(brands)).slice(0, 15);
  }, [products]);

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
      {uniqueBrands.map((brand, index) => (
        <Link key={`${brand}-${index}`} href={`/search?q=${brand}`} className="shrink-0">
          <div className="px-5 py-2.5 mt-2 rounded-full border border-gray-200 bg-white text-sm font-medium shadow-sm transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:-translate-y-0.5 whitespace-nowrap">
            {brand}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default YouInterestedHeadSlider;
