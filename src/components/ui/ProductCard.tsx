'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FC, memo, useMemo } from 'react';
import { Star, Package, Award, Heart } from 'lucide-react';
import { IProducts } from '@/types/types';

import { HIGHLIGHTS_DATA, PRODUCT_BADGES } from '@/constants';
import { useFavorites } from '@/hooks/useFavorites';
import InformationSlider, { SliderItem } from './InformationSlider';

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const formatPrice = (amount: number, currency: string = 'TRY') =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);

interface Props {
  item: IProducts;
  variant?: 'default' | 'flash' | 'bestseller';
}

const ProductCard: FC<Props> = ({ item, variant = 'default' }) => {
  const { toggleFavorite, favoriteIds, isProcessing } = useFavorites();

  const isFav = useMemo(() => {
    return favoriteIds.some((favId) => Number(favId) === Number(item.id));
  }, [favoriteIds, item.id]);

  const currentPrice = item.discountPrice ?? item.price;
  const hasDiscount = item.discountPrice !== null && item.discountPrice < item.price;

  const productUrl = useMemo(
    () => `/product/${item.id}-${createSlug(item.title)}`,
    [item.id, item.title]
  );

  const discountRate = useMemo(
    () => (hasDiscount ? Math.round(((item.price - currentPrice) / item.price) * 100) : 0),
    [hasDiscount, item.price, currentPrice]
  );

  const mappedBadges: SliderItem[] = useMemo(() => {
    const badges: SliderItem[] = [];
    if (item.isFreeShipping) {
      badges.push({
        id: 'free-ship',
        text: 'Kargo Bedava',
        icon: <Package size={14} className="min-w-3.5" strokeWidth={2.5} />,
      });
    }
    if (item.badges?.length) {
      item.badges.forEach((badgeText, index) => {
        if (badgeText === 'Kargo Bedava') return;
        const MatchedIconComponent =
          PRODUCT_BADGES.find((b) => b.text === badgeText)?.icon || Award;
        badges.push({
          id: `badge-${index}`,
          text: badgeText,
          icon: <MatchedIconComponent size={14} className="min-w-3.5" strokeWidth={2.5} />,
        });
      });
    }
    return badges;
  }, [item.isFreeShipping, item.badges]);

  const mappedHighlights: SliderItem[] = useMemo(() => {
    return HIGHLIGHTS_DATA.map((h) => ({
      id: `hl-${item.id}-${h.id}`,
      text: h.text,
      icon: h.icon ? <h.icon size={12} /> : undefined,
    }));
  }, [item.id]);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <Link
      href={productUrl}
      className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-orange-300"
    >
      <button
        onClick={handleFavoriteClick}
        disabled={isProcessing}
        className="absolute right-2 top-2 z-20 rounded-full bg-white p-2 shadow-sm border border-gray-100 transition-transform active:scale-95 hover:shadow-md"
      >
        <Heart
          size={18}
          fill={isFav ? '#f97316' : 'transparent'}
          className={`transition-colors duration-200 ${
            isFav ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
          }`}
        />
      </button>

      <div className="relative aspect-3/4 w-full bg-white p-4">
        <Image
          src={item.images?.[0] || '/placeholder.png'}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-contain transition-transform duration-500 hover:scale-105"
          priority={false}
        />
        {hasDiscount && (
          <div className="absolute left-0 top-3 z-10 rounded-r bg-red-600 px-2 py-1 text-[10px] font-bold text-white shadow-sm">
            %{discountRate}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="mb-2 min-h-10">
          <h3 className="line-clamp-2 text-xs leading-relaxed text-gray-700">
            <span className="font-bold text-gray-900 mr-1">{item.brandName}</span>
            {item.description}
          </h3>
        </div>

        <div className="mb-3 h-6 overflow-hidden">
          <InformationSlider items={mappedHighlights} textColor="text-gray-500" />
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-1">
            <div className="flex text-orange-400">
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <span className="ml-1 text-[10px] font-bold text-gray-600">{item.rating}</span>
            </div>
            <span className="text-[9px] text-gray-400">({item.reviewCount})</span>
          </div>

          <div className="h-6">
            {mappedBadges.length > 0 && (
              <InformationSlider items={mappedBadges} textColor="text-orange-600 font-bold" />
            )}
          </div>

          <div className="flex flex-col items-start pt-1">
            <span
              className={`font-bold ${
                variant === 'flash' ? 'text-lg text-red-600' : 'text-base text-orange-600'
              }`}
            >
              {formatPrice(currentPrice, item.currency)}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-gray-400 line-through">
                {formatPrice(item.price, item.currency)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductCard);
