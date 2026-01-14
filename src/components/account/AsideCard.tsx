'use client';

import { FC } from 'react';
import MailVerificationCard from './components/MailVerificationCard';
import SidebarMenuCard from './components/SidebarMenuCard';
import { USER_MENU } from '@/constants';

interface Props {
  activePath: string | null;
}

const AsideCard: FC<Props> = ({ activePath }) => {
  const orderItems = USER_MENU.filter((i) => ['orders', 'reviews', 'messages'].includes(i.id));
  const serviceItems = USER_MENU.filter((i) => ['credits', 'giveaway'].includes(i.id));
  const specialItems = USER_MENU.filter((i) => ['coupons', 'plus', 'elite'].includes(i.id));
  const accountItems = USER_MENU.filter((i) => ['accountinfo', 'help'].includes(i.id));

  return (
    <div className="flex flex-col gap-4 w-full mt-20">
      {/* Kullanıcı Bilgisi */}
      <MailVerificationCard />

      <nav className="flex flex-col gap-4">
        <SidebarMenuCard title="Siparişlerim" items={orderItems} activePath={activePath} />

        <SidebarMenuCard title="Hizmetlerim" items={serviceItems} activePath={activePath} />

        <SidebarMenuCard title="Sana Özel" items={specialItems} activePath={activePath} />

        <SidebarMenuCard title="Hesabım & Yardım" items={accountItems} activePath={activePath} />
      </nav>
    </div>
  );
};

export default AsideCard;
