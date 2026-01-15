'use client';

import { Search } from 'lucide-react';
import { FC, FormEvent } from 'react';

const HelpInput: FC = () => {
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      className="bg-gradient-to-r from-red-100/30 via-orange-50 to-white w-full flex items-center justify-center py-16 px-4 md:h-64"
      aria-labelledby="help-title"
    >
      <form
        onSubmit={handleSearch}
        className="flex flex-col items-center gap-6 w-full max-w-2xl"
        role="search"
      >
        <h1
          id="help-title"
          className="text-2xl md:text-3xl font-bold text-gray-800 text-center tracking-tight"
        >
          Sana nasıl yardımcı olabiliriz?
        </h1>

        <div className="relative w-full max-w-md group">
          <input
            type="search"
            name="search"
            id="search"
            autoComplete="off"
            className="w-full h-12 pl-4 pr-12 text-sm bg-white border border-gray-200 rounded-xl shadow-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 placeholder:text-gray-400"
            placeholder="Yardım sayfasında konu veya soru ara..."
            aria-label="Yardım sayfasında ara"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white text-gray-400 group-focus-within:text-primary transition-colors hover:bg-gray-50"
            aria-label="Ara"
          >
            <Search className="size-5" />
          </button>
        </div>
      </form>
    </section>
  );
};

export default HelpInput;
