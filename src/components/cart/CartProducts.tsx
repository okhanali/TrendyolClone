'use client';

import { HIGHLIGHTS_DATA } from '@/constants';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { Loader2, Package, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import CartButtons from './components/CartButtons';
import InformationSlider from '../ui/InformationSlider';

const CartProducts: FC = () => {
  const { cartItems, isLoading } = useCart();

  const totalQuantity = useMemo(
    () => cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    [cartItems]
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[400px] gap-4 bg-white rounded-xl border border-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
        <span className="text-gray-500 font-medium animate-pulse">Sepetiniz yükleniyor...</span>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center min-h-[450px]">
        <div className="bg-orange-50 p-6 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-orange-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Sepetiniz şu an boş</h2>
        <p className="text-gray-500 mb-8 max-w-xs text-sm">
          Sepetinizde ürün bulunmamaktadır. Alışverişe başlayarak size özel fırsatları yakalayın.
        </p>
        <Link
          href="/"
          className="bg-orange-600 px-10 py-3 text-sm font-bold rounded-lg text-white hover:bg-orange-700 transition-all shadow-md active:scale-95"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h2 className="text-lg font-bold text-gray-800 px-1">
        Sepetim <span className="text-gray-400 font-normal">({totalQuantity} Ürün)</span>
      </h2>

      <div className="flex flex-col gap-4">
        {cartItems.map((item, index) => {
          const lineTotal = item.price * item.quantity;

          return (
            <div
              key={`${item.id}-${index}`}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Satıcı Bilgisi */}
              <div className="bg-gray-50/80 px-4 py-2 flex items-center gap-2 border-b border-gray-100">
                <span className="text-[11px] text-gray-500 uppercase tracking-tight">Satıcı:</span>
                <span className="text-xs font-bold text-gray-800 hover:text-primary cursor-pointer transition-colors">
                  {item.brandName}
                </span>
              </div>

              <div className="p-4 flex flex-row gap-4">
                <div className="relative w-20 h-24 sm:w-28 sm:h-32 shrink-0 bg-white rounded-lg border border-gray-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="112px"
                    className="object-contain p-1"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    priority={index < 2}
                    quality={60}
                  />
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 leading-snug h-9">
                    <span className="font-bold mr-1">{item.brandName}</span>
                    {item.description || item.title}
                  </h3>

                  {/* Detaylar & Slider */}
                  <div className="mt-2 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-bold">
                        Beden: {item.selectedVariant.size}
                      </span>
                      {item.selectedVariant.color && (
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-bold">
                          Renk: {item.selectedVariant.color}
                        </span>
                      )}
                    </div>
                    <div className="max-w-full sm:max-w-[280px]">
                      <InformationSlider
                        items={HIGHLIGHTS_DATA.map((h) => ({
                          id: `cart-hl-${item.id}-${h.id}`,
                          text: h.text,
                          icon: <h.icon className="w-3 h-3" />,
                        }))}
                        textColor="text-orange-600"
                        className="bg-orange-50/40 py-1 px-2 rounded h-6"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                    <CartButtons item={item} />

                    <div className="flex flex-col items-end w-full sm:w-auto">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                        Birim: {formatPrice(item.price)}
                      </span>
                      <div className="text-base sm:text-lg font-black text-orange-600">
                        {formatPrice(lineTotal)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartProducts;
