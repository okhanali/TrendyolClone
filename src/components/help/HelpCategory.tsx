import { HELP_ITEMS } from '@/constants';
import React, { FC } from 'react';

const HelpCategory: FC = () => {
  return (
    <section className="w-full max-w-7xl px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {HELP_ITEMS.map((item) => (
          <article
            key={item.id}
            className="group aspect-square border border-gray-100 bg-white p-4 flex flex-col items-center justify-center text-center rounded-2xl hover:border-primary hover:shadow-lg hover:shadow-orange-100/50 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 mb-3 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <span className="text-primary font-bold text-xl">{item.title[0]}</span>
            </div>

            <h3 className="font-semibold text-gray-700 group-hover:text-primary text-sm md:text-base transition-colors line-clamp-2">
              {item.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HelpCategory;
