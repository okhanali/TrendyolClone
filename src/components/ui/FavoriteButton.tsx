'use client';

import { FC, MouseEvent } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface Props {
  productId: number;
  className?: string;
}

const FavoriteButton: FC<Props> = ({ productId, className }) => {
  const { toggleFavorite, isFavorite, isProcessing } = useFavorites();
  const isFav = isFavorite(productId);

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFavorite(productId);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isProcessing}
      className={`
        z-10 p-1.5 rounded-full shadow-sm transition-all active:scale-95
        disabled:opacity-50
        ${
          isFav
            ? 'bg-white text-orange-500 hover:text-red-600'
            : 'bg-white/80 text-gray-400 hover:text-orange-500 hover:scale-110'
        } 
        ${className}
      `}
    >
      <Heart
        size={18}
        fill={isFav ? 'currentColor' : 'none'}
        className="transition-colors duration-200"
      />
    </button>
  );
};

export default FavoriteButton;
