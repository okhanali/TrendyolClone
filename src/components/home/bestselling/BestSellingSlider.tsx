'use client';

import { FC } from 'react';
import { IProducts } from '@/types/types';
import BaseCarousel from '@/components/ui/BaseCarousel';
import ProductCard from '@/components/ui/ProductCard';
import { ResponsiveType } from 'react-multi-carousel';

interface Props {
  products: IProducts[];
}

const BestSellingSlider: FC<Props> = ({ products }) => {
  if (!products || products.length === 0) return null;

  const productResponsive: ResponsiveType = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1440 }, items: 5 },
    desktop: { breakpoint: { max: 1440, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 3 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 2 },
  };

  return (
    <div className="relative">
      <BaseCarousel responsiveOverride={productResponsive}>
        {products.map((item) => (
          <div key={item.id} className="h-full px-2 py-2">
            <ProductCard item={item} variant="bestseller" />
          </div>
        ))}
      </BaseCarousel>
    </div>
  );
};

export default BestSellingSlider;
