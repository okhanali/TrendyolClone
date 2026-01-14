'use client';

import { FC, useEffect, useState, useRef, memo, ReactNode } from 'react';

export interface SliderItem {
  id: string | number;
  text: string;
  icon?: ReactNode;
}

interface Props {
  items: SliderItem[];
  className?: string;
  textColor?: string;
}

const SLIDE_INTERVAL = 3000;
const ITEM_HEIGHT = '1.75rem';

const InformationSlider: FC<Props> = ({ items, className = '', textColor = 'text-gray-600' }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!items || items.length === 0) return null;

  // Tek eleman durumu
  if (items.length === 1) {
    const Item = items[0];
    return (
      <div className={`h-7 flex items-center gap-2 text-xs w-full ${className}`}>
        {Item.icon && <span className="shrink-0">{Item.icon}</span>}
        <span className={`truncate ${textColor} font-medium`}>{Item.text}</span>
      </div>
    );
  }

  const extendedData = [...items, items[0]];

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, SLIDE_INTERVAL);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex === items.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  return (
    <div className={`h-7 overflow-hidden relative w-full ${className}`}>
      <div
        className={`flex flex-col will-change-transform ${
          isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''
        }`}
        style={{ transform: `translateY(calc(-${currentIndex} * ${ITEM_HEIGHT}))` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedData.map((item, index) => {
          const uniqueKey = `slider-${index}`;
          return (
            <div key={uniqueKey} className="h-7 flex items-center gap-2 text-xs w-full shrink-0">
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span className={`truncate ${textColor} font-medium`}>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(InformationSlider);
