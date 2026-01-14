'use client';

import { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import 'react-multi-carousel/lib/styles.css';
import { ResponsiveType } from 'react-multi-carousel';
import { CustomLeftArrow, CustomRightArrow } from '../home/CarouselNavigation';

const Carousel = dynamic(() => import('react-multi-carousel'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-50 animate-pulse rounded-lg" />,
});

interface BaseCarouselProps {
  children: ReactNode;
  deviceType?: string;
  itemCount?: number;
  responsiveOverride?: ResponsiveType;
}

const BaseCarousel: FC<BaseCarouselProps> = ({
  children,
  deviceType,
  itemCount = 4,
  responsiveOverride,
}) => {
  const defaultResponsive: ResponsiveType = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: itemCount + 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: itemCount },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: itemCount > 4 ? 4 : 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: itemCount > 4 ? 3 : 1 },
  };

  return (
    <div className="relative -mx-2 group">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsiveOverride || defaultResponsive}
        ssr={false}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container py-2"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        deviceType={deviceType}
        itemClass="px-2"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {children}
      </Carousel>
    </div>
  );
};

export default BaseCarousel;
