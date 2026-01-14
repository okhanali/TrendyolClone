'use client';
import { FC } from 'react';
import { useCart } from '@/hooks/useCart';
import { IProducts, IVariant, ICartItem } from '@/types/types';
import { toast } from 'react-toastify';
import { CreditCard, ShoppingBag, Loader2, Heart } from 'lucide-react';

interface Props {
  product: IProducts;
  selectedVariant: IVariant | null;
}

const ProductDetailButtons: FC<Props> = ({ product, selectedVariant }) => {
  const { addToCart, buyNowSingleItem, isLoading } = useCart();

  const handleAction = (type: 'add' | 'buy') => {
    if (!selectedVariant) {
      toast.warning('Lütfen bir beden seçiniz.');
      return;
    }

    const item: ICartItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      userId: '',
      quantity: 1,
      brandName: product.brandName,
      rating: product.rating,
      description: product.description,
      selectedVariant: selectedVariant,
      stock: selectedVariant.stock,
    };

    type === 'add' ? addToCart(item) : buyNowSingleItem(item);
  };

  return (
    <div className="flex gap-2 sm:gap-3 mt-4 w-full">
      <button
        disabled={isLoading}
        onClick={() => handleAction('buy')}
        className="flex-1 h-11 sm:h-12 border-2 border-primary text-primary font-bold rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-orange-50 disabled:opacity-50 text-xs sm:text-base whitespace-nowrap px-1"
      >
        <CreditCard size={18} className="sm:w-5 sm:h-5" /> Şimdi Al
      </button>

      <button
        disabled={isLoading}
        onClick={() => handleAction('add')}
        className="flex-[1.5] h-11 sm:h-12 bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-orange-600 disabled:opacity-70 text-xs sm:text-base whitespace-nowrap px-1"
      >
        {isLoading ? (
          <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
        )}
        <span>{selectedVariant ? 'Sepete Ekle' : 'Beden Seç'}</span>
      </button>

      <button className="w-11 h-11 sm:w-12 sm:h-12 flex shrink-0 items-center justify-center border border-gray-200 text-gray-400 rounded-full hover:text-primary transition-all">
        <Heart size={20} className="sm:w-5.5 sm:h-5.5" />
      </button>
    </div>
  );
};

export default ProductDetailButtons;
