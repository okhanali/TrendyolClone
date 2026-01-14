'use client';

import { DESC_ITEMS } from '@/constants';
import { FC, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DescPage: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mt-8 border-t border-gray-200 pt-8 pb-4">
      <div className="flex flex-col gap-4">
        {/* Ana Başlık */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Tüm İhtiyaçlarınız İçin Tek Adres Trendyol!
        </h2>

        <div
          className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-500' : 'max-h-70'
          }`}
        >
          <div className="flex flex-col gap-6 text-sm text-gray-600 leading-relaxed">
            {DESC_ITEMS.map((item) => (
              <article key={item.id}>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          {/* Fade Efekti */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        {/* Göster / Gizle Butonu */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-2 w-full py-3 mt-2 text-sm font-semibold text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md transition-colors border border-gray-200 bg-white shadow-sm"
        >
          {isExpanded ? (
            <>
              Daha Az Göster <ChevronUp size={16} />
            </>
          ) : (
            <>
              Daha Fazla Göster <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default DescPage;
