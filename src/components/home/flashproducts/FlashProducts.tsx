import { getProducts } from '@/services/services';
import { FC } from 'react';
import SpecialProductsSlider from '../specialproducts/SpecialProductsSlider';
import { Zap } from 'lucide-react';
import FlashCountdown from './FlashCountdown';

const FlashProducts: FC = async () => {
  const data = await getProducts();

  return (
    <section className="rounded-lg border border-transparent bg-linear-to-r from-orange-500 to-red-600 p-5 flex flex-col gap-4 shadow-md text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* HEADER ALANI */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
        {/*  Başlık ve İkon */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md shadow-lg border border-white/20">
            <Zap
              className="text-yellow-300 fill-yellow-300 animate-[pulse_2s_infinite]"
              size={24}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight drop-shadow-sm">Flaş Ürünler</h2>
            <p className="text-xs text-orange-100 font-medium opacity-90">
              Sınırlı stok, fırsatları kaçırma!
            </p>
          </div>
        </div>

        <FlashCountdown />
      </div>

      {/* SLIDER */}
      <div className="-mx-2 z-10 relative">
        <SpecialProductsSlider products={data} variant="flash" />
      </div>
    </section>
  );
};

export default FlashProducts;
