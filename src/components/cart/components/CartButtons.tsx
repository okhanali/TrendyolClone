'use client';

import { useCart } from '@/hooks/useCart';
import { ICartItem } from '@/types/types';
import { Trash2, Minus, Plus } from 'lucide-react';
import { FC } from 'react';

interface Props {
  item: ICartItem;
}

const CartButtons: FC<Props> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(String(item.id), item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(String(item.id), item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(String(item.id));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm h-10 select-none">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
          className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-gray-50 disabled:opacity-30 transition-colors rounded-l-lg cursor-pointer disabled:cursor-not-allowed"
        >
          <Minus size={14} />
        </button>

        <div className="w-10 h-full flex items-center justify-center text-sm font-semibold text-gray-700 bg-gray-50 border-x border-gray-100 min-w-10">
          {item.quantity}
        </div>

        <button
          type="button"
          onClick={handleIncrease}
          className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-gray-50 transition-colors rounded-r-lg cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleRemove}
        title="Sepetten Kaldır"
        className="flex items-center gap-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer text-sm group"
      >
        <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
          <Trash2 size={18} />
        </div>
      </button>
    </div>
  );
};

export default CartButtons;
