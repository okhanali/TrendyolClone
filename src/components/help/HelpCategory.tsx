import { HELP_ITEMS } from '@/constants';
import React, { FC } from 'react';

const HelpCategory: FC = () => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5 mb-10">
      {HELP_ITEMS.map((item) => (
        <div
          key={item.id}
          className="border p-2 flex items-center w-42 h-42 justify-center text-center rounded-xl hover:border-primary hover:bg-orange-50 cursor-pointer transition duration-50"
        >
          <h3 className="font-medium">{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default HelpCategory;
