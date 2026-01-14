import { getProducts } from '@/services/services';
import { FC } from 'react';
import SpecialProductsSlider from './SpecialProductsSlider';
import { ChevronRight } from 'lucide-react';

const SpecialsProduct: FC = async () => {
  const data = await getProducts();

  return (
    <section className="rounded-lg border border-gray-200 bg-linear-to-t from-white to-pink-50/60 p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Sana Özel Ürünler</h2>
        <button className="flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
          Tümünü Gör <ChevronRight size={16} />
        </button>
      </div>

      <SpecialProductsSlider products={data} />
    </section>
  );
};

export default SpecialsProduct;
