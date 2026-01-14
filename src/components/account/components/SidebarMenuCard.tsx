'use client';

import Link from 'next/link';
import { FC } from 'react';

export interface MenuItem {
  id: string;
  title: string;
  url?: string;
  icon: any;
}

interface SidebarMenuCardProps {
  title: string;
  items: MenuItem[];
  activePath?: string | null;
}

const SidebarMenuCard: FC<SidebarMenuCardProps> = ({ title, items, activePath }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
      {/* Başlık */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wide">{title}</h3>
      </div>

      {/* Menü Elemanları */}
      <div className="flex flex-col py-1">
        {items.map((item) => {
          const safeUrl = item.url || '#';

          const isActive =
            activePath && item.url
              ? activePath === item.url || activePath.startsWith(`${item.url}/`)
              : false;

          return (
            <Link
              key={item.id}
              href={safeUrl}
              className={`
                group flex items-center gap-3 px-4 py-2.5 text-sm font-medium border-l-[3px] transition-all duration-200
                ${
                  isActive
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-orange-600'
                }
              `}
            >
              <item.icon
                size={18}
                className={`transition-colors ${
                  isActive ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-500'
                }`}
              />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarMenuCard;
