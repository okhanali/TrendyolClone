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
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!items || items.length === 0) return null;

  const shouldAnimate = items.length > 1 && isHovered;

  useEffect(() => {
    if (!shouldAnimate) {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
      setCurrentIndex(0);
      return;
    }

    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, SLIDE_INTERVAL);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [shouldAnimate]);

  const handleTransitionEnd = () => {
    if (currentIndex === items.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  return (
    <div
      className={`h-7 overflow-hidden relative w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex flex-col will-change-transform ${
          isTransitioning && shouldAnimate ? 'transition-transform duration-500 ease-in-out' : ''
        }`}
        style={{ transform: `translateY(calc(-${currentIndex} * ${ITEM_HEIGHT}))` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {(shouldAnimate ? [...items, items[0]] : [items[0]]).map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="h-7 flex items-center gap-2 text-xs w-full shrink-0"
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span className={`truncate ${textColor} font-medium`}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(InformationSlider);
