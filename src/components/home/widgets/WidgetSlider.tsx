'use client';

import { FC } from 'react';
import Image from 'next/image';
import { IWidgetContent } from '@/types/types';
import BaseCarousel from '@/components/ui/BaseCarousel';
import { ResponsiveType } from 'react-multi-carousel';

interface SliderProps {
  items: IWidgetContent[];
}

const WidgetSlider: FC<SliderProps> = ({ items }) => {
  const widgetResponsive: ResponsiveType = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 11 },
    desktop: { breakpoint: { max: 3000, min: 1280 }, items: 10 },
    tablet: { breakpoint: { max: 1280, min: 768 }, items: 7 },
    mobile: { breakpoint: { max: 768, min: 480 }, items: 5 },
    smallMobile: { breakpoint: { max: 480, min: 0 }, items: 4 },
  };

  return (
    <div className="relative">
      <BaseCarousel responsiveOverride={widgetResponsive}>
        {items.map((image, i) => (
          <div
            key={i}
            className="flex h-full cursor-pointer flex-col items-center justify-start gap-2"
          >
            <div className="relative h-16 w-16 md:h-17.5 md:w-17.5 overflow-hidden rounded-full border border-gray-200 bg-white p-0.5 shadow-sm transition-all duration-300 hover:border-orange-500 hover:shadow-md">
              <Image
                src={image.image}
                alt={image.title || 'widget'}
                fill
                className="rounded-full object-cover border hover:border-primary"
                sizes="(max-width: 768px) 64px, 70px"
                loading="lazy"
              />
            </div>

            {/* Metin Alanı */}
            <span className="flex w-full items-start justify-center px-1 text-center text-[11px] font-medium leading-tight text-gray-700 transition-colors hover:text-orange-600 md:text-xs">
              {image.title}
            </span>
          </div>
        ))}
      </BaseCarousel>
    </div>
  );
};

export default WidgetSlider;
