'use client';

import { FC } from 'react';
import BaseCarousel from '@/components/ui/BaseCarousel';
import { CATEGORY_ITEMS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { ResponsiveType } from 'react-multi-carousel';

const DiscountCategorySlider: FC = () => {
  const categoryData = CATEGORY_ITEMS;

  const categoryResponsive: ResponsiveType = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1440 }, items: 8 },
    desktop: { breakpoint: { max: 1440, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 4 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 3 },
  };

  return (
    <div className="relative">
      <BaseCarousel responsiveOverride={categoryResponsive}>
        {categoryData.map((item, i) => (
          <div key={i} className="h-full px-2 py-2">
            <Link href={item.link} className="block h-full">
              <div className="relative overflow-hidden rounded-lg ">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 16vw, 12vw"
                  className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105 rounded-lg shadow-sm hover:shadow-md border border-gray-100"
                />
              </div>
            </Link>
          </div>
        ))}
      </BaseCarousel>
    </div>
  );
};

export default DiscountCategorySlider;
