'use client';

import { HIGHLIGHTS_DATA } from '@/constants';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { Loader2, Package, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import CartButtons from './components/CartButtons';
import InformationSlider from '../ui/InformationSlider';

const CartProducts: FC = () => {
  const { cartItems, isLoading } = useCart();
  const totalQuantity = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-100 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
        <span className="text-gray-500 font-medium">Sepetiniz yükleniyor...</span>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center animate-in fade-in duration-500 min-h-100">
        <div className="bg-orange-50 p-6 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sepetiniz şu an boş</h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          Sepetinizde ürün bulunmamaktadır. Kampanyalı ürünlere göz atarak alışverişe
          başlayabilirsiniz.
        </p>
        <Link
          href="/"
          className="flex gap-2 bg-orange-600 px-8 py-3 text-sm font-bold items-center rounded-lg text-white hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
        >
          <Package className="w-4 h-4" />
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Sepetim ({totalQuantity} Ürün)</h2>
      </div>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => {
          const lineTotal = item.price * item.quantity;

          return (
            <div
              key={item.id}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-orange-200 hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="bg-gray-50/50 px-4 py-2 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>Satıcı:</span>
                  <span className="font-bold text-gray-900">{item.brandName}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex gap-4 sm:gap-6">
                {/* Ürün Görseli */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-white border border-gray-100 rounded-lg p-2">
                  <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                </div>

                {/* Ürün Detayları */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed">
                      <span className="font-bold mr-1">{item.brandName}</span>
                      {item.description || item.title}
                    </h3>
                  </div>

                  {/* Varyant ve Highlights Bölümü */}
                  <div className="mt-2 flex flex-col gap-2">
                    {/* Seçilen Varyant */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium">
                        Beden: {item.selectedVariant.size}
                      </span>
                      {item.selectedVariant.color && (
                        <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium">
                          Renk: {item.selectedVariant.color}
                        </span>
                      )}
                    </div>

                    {/* Social Slider */}
                    <div className="max-w-75">
                      <InformationSlider
                        items={HIGHLIGHTS_DATA.map((h) => ({
                          id: `cart-hl-${item.id}-${h.id}`,
                          text: h.text,
                          icon: <h.icon className="w-3.5 h-3.5" />,
                        }))}
                        textColor="text-orange-600"
                        className="bg-orange-50/50 py-1 px-2 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Butonlar ve Fiyat */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-auto pt-4">
                    <CartButtons item={item} />
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-gray-400 font-medium uppercase">
                        Toplam
                      </span>
                      <div className="text-lg font-bold text-orange-600 tracking-tight">
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
