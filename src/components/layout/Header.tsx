'use client';

import { FC } from 'react';
import Link from 'next/link';
import HeaderInput from '../form/HeaderInput';
import HeaderCategory from '../categories/HeaderCategory';
import HeaderActions from './components/HeaderActions';
import { SlEarphonesAlt } from 'react-icons/sl';
import HamburgerMenu from '../categories/HamburgerMenu';

const Header: FC = () => {
  return (
    <header className="flex flex-col border-b border-border bg-white sticky top-0 z-40 w-full transition-shadow duration-300">
      <div className="hidden md:flex container-custom items-center justify-end py-2 gap-6 text-xs text-muted-foreground">
        <p className="headerTopPrg">İndirim Kuponlarım</p>
        <p className="headerTopPrg">Trendyol'da Satış Yap</p>
        <p className="headerTopPrg">Hakkımızda</p>
        <p className="headerTopPrg flex items-center gap-1 hover:text-primary transition-colors">
          <SlEarphonesAlt className="text-sm" />
          Kullanıcı Yorumları
        </p>
      </div>

      <div className="container-custom py-3 md:py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="md:hidden">
              <HamburgerMenu />
            </div>

            {/* Logo */}
            <Link href="/" className="text-2xl md:text-3xl text-primary font-bold tracking-tight">
              <h1>
                trendyol<span className="text-foreground">clone</span>
              </h1>
            </Link>
          </div>

          <div className="w-full order-last md:order-0 md:w-auto md:flex-1 md:mx-8">
            <HeaderInput />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <HeaderActions />
          </div>
        </div>
      </div>

      <div className="hidden md:block border-t md:border-t-0">
        <div className="container-custom">
          <HeaderCategory />
        </div>
      </div>
    </header>
  );
};

export default Header;
