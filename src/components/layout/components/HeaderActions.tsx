'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { HEADER_LINKS } from '@/constants';
import UserMenu from '@/components/auth/header/UserMenu';

const HeaderActions: FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <Loader2 className="animate-spin h-5 w-5" />
      </div>
    );
  }

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

        // Giriş yapmışsa 'Giriş Yap' linkini gizle
        if (item.href === '/login' && user) return null;

        return (
          <Link
            key={i}
            href={item.href}
            className="flex flex-col md:flex-row items-center gap-1 group hover:text-primary transition-colors relative"
          >
            <item.icon className="size-5 md:size-5 group-hover:text-primary" />

            <span className="hidden md:block text-xs md:text-sm font-medium">{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderActions;
