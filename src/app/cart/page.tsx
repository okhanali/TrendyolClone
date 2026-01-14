'use client';

import CartBuy from '@/components/cart/CartBuy';
import CartProducts from '@/components/cart/CartProducts';
import { useCart } from '@/hooks/useCart';
import { FC } from 'react';

const CartPage: FC = () => {
  const { cartItems, isLoading } = useCart();

  // Sepet boş mu kontrol
  const isCartEmpty = !isLoading && (!cartItems || cartItems.length === 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        <div className={`w-full ${isCartEmpty ? '' : 'lg:w-2/3'}`}>
          <CartProducts />
        </div>
        {!isCartEmpty && (
          <div className="w-full lg:w-1/3 sticky top-24">
            <CartBuy />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
