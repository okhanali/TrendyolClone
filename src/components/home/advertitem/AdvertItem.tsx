'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DISCOUNT_ITEMS } from '@/constants';

const AdvertItem: FC = () => {
  const discountData = DISCOUNT_ITEMS;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {discountData.map((item, i) => (
        <Link key={i} href={item.link || '/'} className="group block w-full">
          <div className="relative w-full aspect-[2.5/1] overflow-hidden rounded-lg border border-transparent hover:border-orange-200 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 z-10 transition-colors duration-300" />

            <Image
              src={item.image}
              alt={item.title || 'Kampanya'}
              fill
              className="object-cover w-full h-full transform transition-transform duration-700 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={i < 3}
            />
          </div>
        </Link>
      ))}
    </section>
  );
};

export default AdvertItem;
