'use client';

import { IVariant } from '@/types/types';
import { FC, useMemo } from 'react';

interface Props {
  uniqColors: string[];
  selectedColor: string;
  selectedSize: string;
  availableSizes: IVariant[];
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}

const ProductDetailVariants: FC<Props> = ({
  uniqColors,
  selectedColor,
  selectedSize,
  availableSizes,
  onColorChange,
  onSizeChange,
}) => {
  const variantLabel = useMemo(() => {
    if (!availableSizes || availableSizes.length === 0) return 'Seçenek';

    const sampleSize = availableSizes[0].size.toLowerCase();

    if (sampleSize.includes('gb') || sampleSize.includes('tb') || sampleSize.includes('ram')) {
      return 'Kapasite'; // Telefon, Bilgisayar
    }
    if (
      sampleSize.includes('ml') ||
      sampleSize.includes('lt') ||
      sampleSize.includes('kg') ||
      sampleSize.includes('gr')
    ) {
      return 'Miktar / Hacim'; // Deterjan, Parfüm, Gıda
    }
    if (sampleSize.includes('cm') || sampleSize.includes('mm') || sampleSize.includes('inç')) {
      return 'Ölçü'; // Mobilya, Ekran
    }
    if (sampleSize === 'standart' || sampleSize === 'tek ebat') {
      return 'Ebat'; // Aksesuar, Çanta
    }

    return 'Beden'; // Varsayılan (Giyim, Ayakkabı)
  }, [availableSizes]);

  return (
    <div className="space-y-6">
      {/* 🎨 Renk Seçimi - (Eğer sadece 1 renk varsa ve o da "standart" gibi bir şeyse gizlenebilir, ama şimdilik bırakıyoruz) */}
      {uniqColors.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-gray-700">
            Renk: <span className="text-gray-900 font-bold ml-1">{selectedColor}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {uniqColors.map((color) => {
              const isSelected = selectedColor === color;
              return (
                <button
                  key={color}
                  onClick={() => onColorChange(color)}
                  className={`
                    h-10 px-4 min-w-12 rounded-lg border text-sm font-medium transition-all duration-200
                    flex items-center justify-center relative overflow-hidden outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-200
                    ${
                      isSelected
                        ? 'border-orange-600 ring-1 ring-orange-600 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-400 text-gray-600 bg-white hover:bg-gray-50'
                    }
                  `}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/*  Dinamik Varyant Seçimi  */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-700">
          {variantLabel}:{' '}
          <span className="text-gray-900 font-bold ml-1">{selectedSize || 'Seçiniz'}</span>
        </h3>

        <div className="flex flex-wrap gap-2">
          {availableSizes.map((variant, i) => {
            const isSelected = selectedSize === variant.size;
            const isOutOfStock = variant.stock === 0;

            return (
              <button
                key={`${variant.color}-${variant.size}-${i}`}
                disabled={isOutOfStock}
                onClick={() => onSizeChange(variant.size)}
                className={`
                  h-10 min-w-14 px-4 rounded-lg border text-sm font-medium transition-all duration-200 outline-none
                  ${
                    isOutOfStock
                      ? 'bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100 decoration-gray-400' // Çizgiyi kaldırdım, daha temiz görünüm
                      : isSelected
                      ? 'border-orange-600 bg-orange-600 text-white shadow-md shadow-orange-200'
                      : 'border-gray-200 hover:border-orange-500 hover:text-orange-600 text-gray-700 bg-white'
                  }
                `}
              >
                {variant.size}
              </button>
            );
          })}
        </div>

        {/* Stok Uyarısı */}
        {selectedSize &&
          availableSizes.find((v) => v.size === selectedSize)?.stock! < 5 &&
          availableSizes.find((v) => v.size === selectedSize)?.stock! > 0 && (
            <p className="text-xs text-orange-600 font-semibold animate-pulse mt-1 flex items-center gap-1">
              <span className="text-lg">🔥</span>
              Tükeniyor! Son {availableSizes.find((v) => v.size === selectedSize)?.stock} ürün.
            </p>
          )}
      </div>
    </div>
  );
};

export default ProductDetailVariants;
