'use client';

import { FC, useState, useEffect } from 'react';
import { IProducts, ICartItem } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/hooks/useCart';
import { Trash2, ShoppingCart, HeartOff, Loader2 } from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import { toast } from 'react-toastify';

interface Props {
  initialProducts: IProducts[];
}

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

const FavoriteProductsClient: FC<Props> = ({ initialProducts }) => {
  const [products, setProducts] = useState<IProducts[]>(initialProducts);
  const { toggleFavorite, isProcessing: favProcessing } = useFavorites();
  const { addToCart, isLoading: cartProcessing } = useCart();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleRemove = (productId: number | string) => {
    toggleFavorite(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleAddToCart = (product: IProducts) => {
    const availableVariant = product.variants.find((v) => v.stock > 0);

    if (!availableVariant) {
      toast.error('Bu ürünün stokları tükenmiştir.');
      return;
    }

    const cartItem: ICartItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || '',
      userId: '',
      quantity: 1,
      brandName: product.brandName,
      rating: product.rating,
      description: product.description,
      selectedVariant: availableVariant,
      stock: availableVariant.stock,
    };

    addToCart(cartItem);
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-dashed border-gray-300">
        <div className="bg-orange-50 p-6 rounded-full mb-4 animate-bounce">
          <HeartOff className="w-12 h-12 text-orange-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Favori listeniz henüz boş</h2>
        <Link
          href="/"
          className="mt-6 bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
      {products.map((product) => {
        const productUrl = `/product/${product.id}-${createSlug(product.title)}`;
        const isOutOfStock = !product.variants.some((v) => v.stock > 0);

        return (
          <div
            key={product.id}
            className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
          >
            {/* Ürün Görseli */}
            <Link href={productUrl} className="relative block p-2 bg-white" title={product.title}>
              <div className="relative h-40 sm:h-56 w-full transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={product.images?.[0] || '/placeholder.png'}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded">
                      TÜKENDİ
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* İçerik */}
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <Link href={productUrl} className="mb-2">
                <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 h-10 group-hover:text-orange-600 transition-colors">
                  <span className="font-bold mr-1">{product.brandName}</span>
                  {product.title}
                </h3>
              </Link>

              <div className="mt-auto">
                <p className="text-base sm:text-lg font-black text-orange-600 mb-3 tracking-tight">
                  {formatPrice(product.price)}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={cartProcessing || isOutOfStock}
                    className="flex-3 flex items-center justify-center gap-1.5 bg-white border border-orange-600 text-orange-600 py-2 rounded-lg text-xs font-bold hover:bg-orange-600 hover:text-white transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    {cartProcessing ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <ShoppingCart size={14} />
                    )}
                    <span className="hidden sm:inline">Sepete Ekle</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(product.id);
                    }}
                    disabled={favProcessing}
                    className="flex-1 p-2.5 bg-gray-50 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 disabled:opacity-50 flex items-center justify-center"
                    title="Favorilerden Çıkar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteProductsClient;
