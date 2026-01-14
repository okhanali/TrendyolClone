'use client';

import { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ArrowProps {
  onClick?: () => void;
}

export const CustomLeftArrow: FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-0 top-[40%] -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-all duration-200 hover:scale-110 text-orange-600 hover:shadow-xl cursor-pointer opacity-0 group-hover:opacity-100  md:flex"
      aria-label="Önceki"
    >
      <ChevronLeft size={24} />
    </button>
  );
};

export const CustomRightArrow: FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-0 top-[40%] -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-all duration-200 hover:scale-110 text-orange-600 hover:shadow-xl cursor-pointer opacity-0 group-hover:opacity-100  md:flex"
      aria-label="Sonraki"
    >
      <ChevronRight size={24} />
    </button>
  );
};
