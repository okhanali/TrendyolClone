import { FC } from 'react';
import DiscountCategorySlider from './DiscountCategorySlider';

const DiscountCategory: FC = () => {
  return (
    <section className="flex flex-col gap-4 py-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
          Kategorilerdeki İndirimleri Keşfet
        </h2>
      </div>

      {/* Slider Alanı */}
      <DiscountCategorySlider />
    </section>
  );
};

export default DiscountCategory;
