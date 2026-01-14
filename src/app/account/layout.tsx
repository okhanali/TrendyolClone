'use client';

import { FC, PropsWithChildren } from 'react';
import AsideCard from '@/components/account/AsideCard';
import { usePathname } from 'next/navigation';

const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 mt-6 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* SIDEBAR ALANI */}
        <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24 h-fit">
          <AsideCard activePath={pathname} />
        </aside>

        {/* İÇERİK ALANI */}
        <main className="col-span-1 lg:col-span-3 min-h-125">{children}</main>
      </div>
    </div>
  );
};

export default AccountLayout;
