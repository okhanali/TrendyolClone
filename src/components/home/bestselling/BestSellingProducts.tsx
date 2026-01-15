import { getProducts } from '@/services/services';
import { FC } from 'react';
import BestSellingSlider from './BestSellingSlider';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const BestSellingProducts: FC = async () => {
  const data = await getProducts();

  return (
    <section className="rounded-lg border border-gray-200 bg-linear-to-t from-gray-50 to-white p-5 flex flex-col gap-4 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
          Çok Satan Ürünler
        </h2>
        <Link
          href="/category/cok-satanlar"
          className="flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
        >
          Tümünü Gör <ChevronRight size={16} />
        </Link>
      </div>

      <BestSellingSlider products={data} />
    </section>
  );
};

export default BestSellingProducts;
