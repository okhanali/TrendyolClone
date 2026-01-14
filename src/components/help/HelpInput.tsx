'use client';

import { Search } from 'lucide-react';
import { FC } from 'react';

const HelpInput: FC = () => {
  return (
    <form className="bg-linear-to-r from-red-100/40 to-orange-50 w-full flex items-center justify-center h-56 ">
      <div className="relative flex flex-col items-center justify-center gap-5 w-full ">
        <h2 className="text-2xl font-medium">Sana nasıl yardımcı olabiliriz?</h2>

        <input
          type="search"
          name="search"
          id="search"
          className="outline-none bg-white rounded-md w-1/4 h-10 border hover:border-primary p-2"
          placeholder="Yardım Sayfasında Ara"
        />

        <Search className="absolute top-15 right-160 size-5 text-primary" />
      </div>
    </form>
  );
};

export default HelpInput;
