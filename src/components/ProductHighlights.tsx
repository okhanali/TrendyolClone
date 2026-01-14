'use client';

import { HIGHLIGHTS_DATA } from '@/constants';
import { FC, useEffect, useState, useRef } from 'react';

const ITEM_HEIGHT_REM = 2.5;
const TRANSITION_DURATION = 500;
const SLIDE_INTERVAL = 3000;

const ProductBadgeSlider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const extendedData = [...HIGHLIGHTS_DATA, HIGHLIGHTS_DATA[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === HIGHLIGHTS_DATA.length) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, TRANSITION_DURATION);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  return (
    <div className="h-7 overflow-hidden relative w-full max-w-sm ">
      <div
        className={`flex flex-col ${
          isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''
        }`}
        style={{ transform: `translateY(-${currentIndex * ITEM_HEIGHT_REM}rem)` }}
      >
        {extendedData.map((item, index) => {
          const uniqueKey = `${item.id}-${index}`;

          return (
            <div
              key={uniqueKey}
              className={`h-10 flex items-center gap-2  text-xs  w-full shrink-0 `}
              aria-hidden={index === extendedData.length - 1 ? 'true' : 'false'}
            >
              {item.icon && <item.icon className="w-4 h-4 text-orange-400" />}
              <span className="truncate">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductBadgeSlider;
