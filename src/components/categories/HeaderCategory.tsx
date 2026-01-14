import { HEADER_NAV_ITEMS } from '@/constants';
import Link from 'next/link';
import { FC } from 'react';
import HamburgerMenu from './HamburgerMenu';

const HeaderCategory: FC = () => {
  return (
    <div className="flex items-center gap-4 md:gap-6 pb-2 md:pb-0 overflow-x-auto md:overflow-visible whitespace-nowrap scrollbar-hide">
      {/* Hamburger Menü + Başlık */}
      <div className="flex items-center shrink-0">
        <HamburgerMenu />
        <p className="text-sm font-medium ml-2 cursor-pointer hover:text-primary transition-colors">
          Kategoriler
        </p>
      </div>

      {/* Linkler */}
      <div className="flex items-center gap-4 md:gap-6">
        {HEADER_NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="flex items-center gap-1 hover:text-primary text-sm font-medium transition-colors"
          >
            {item.label}

            {item.badge && (
              <span className="text-[10px] px-1.5 py-0.5 text-white bg-red-600 rounded-full animate-pulse">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeaderCategory;
