'use client';

import { FC, useMemo } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { HEADER_LINKS } from '@/constants';
import UserMenu from '@/components/auth/header/UserMenu';

const HeaderActions: FC = () => {
  const { user, loading } = useAuth();
  const { cartItems } = useCart();

  const cartCount = useMemo(() => {
    return cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  }, [cartItems]);

  if (loading) return <Loader2 className="animate-spin h-5 w-5 text-gray-400" />;

  return (
    <div className="flex items-center gap-3 md:gap-5">
      {HEADER_LINKS.map((item, i) => {
        if (item.href === '/login' && user) {
          return (
            <div key="user-menu">
              <UserMenu user={user} />
            </div>
          );
        }

        const isCart = item.href === '/cart';

        return (
          <Link
            key={i}
            href={item.href}
            className="flex flex-col md:flex-row items-center gap-1 group hover:text-primary transition-colors relative"
          >
            <div className="relative flex items-center justify-center w-8 h-8 md:w-auto">
              <item.icon className="size-5 md:size-6 group-hover:text-primary transition-transform duration-200" />

              {isCart && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-primary text-white text-[9px] md:text-[10px] font-bold min-w-4 h-4 flex items-center justify-center rounded-full px-1 shadow-sm border border-white animate-in zoom-in duration-300">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>

            <span className="hidden md:block text-xs md:text-sm font-medium">{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderActions;
