'use client';

import { FC, useState, FormEvent, useEffect, useRef } from 'react';
import { BiSearch, BiTime, BiX } from 'react-icons/bi'; // İkonları ekledik
import { useRouter } from 'next/navigation';

const HISTORY_KEY = 'trend_search_history';
const MAX_HISTORY = 6;

const HeaderInput: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Sayfa açılınca geçmişi yükle
  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Dışarı tıklayınca geçmişi kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveToHistory = (term: string) => {
    // Önce varsa eski kaydı sil, sonra yeniyi ekle
    const newHistory = [term, ...history.filter((h) => h !== term)].slice(0, MAX_HISTORY);
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const removeFromHistory = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    const newHistory = history.filter((h) => h !== term);
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const handleSearch = (e?: FormEvent, searchTerm?: string) => {
    if (e) e.preventDefault();

    const finalQuery = searchTerm || query;
    if (finalQuery.trim().length === 0) return;

    saveToHistory(finalQuery.trim());
    setShowHistory(false);
    router.push(`/search?q=${encodeURIComponent(finalQuery.trim())}`);
  };

  return (
    <div ref={containerRef} className="relative w-full z-50">
      <form
        onSubmit={handleSearch}
        className={`
          bg-gray-100 border border-transparent flex items-center w-full h-10 md:h-11 relative transition-all duration-300 group
          ${
            showHistory
              ? 'rounded-t-lg bg-white shadow-sm border-gray-200'
              : 'rounded-lg focus-within:bg-white focus-within:border-orange-500 focus-within:shadow-sm'
          }
        `}
      >
        <input
          className="bg-transparent outline-none w-full ml-3 md:ml-4 pr-10 text-sm md:text-base text-gray-700 placeholder-gray-500"
          type="text"
          placeholder="Aradığınız ürün, kategori veya markayı yazınız"
          value={query}
          onFocus={() => setShowHistory(true)}
          onChange={(e) => setQuery(e.target.value)}
          enterKeyHint="search"
          autoComplete="off"
        />

        <button
          type="submit"
          className="absolute right-1 p-1.5 rounded-full text-orange-600 hover:bg-orange-50 transition duration-200"
          aria-label="Ara"
        >
          <BiSearch className="size-5 md:size-6" />
        </button>
      </form>

      {/* ARAMA GEÇMİŞİ DROPDOWN */}
      {showHistory && history.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border-x border-b border-gray-200 rounded-b-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          {/* Başlık ve Temizle */}
          <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500">Geçmiş Aramalar</span>
            <button
              onClick={clearAllHistory}
              className="text-xs text-orange-600 hover:underline hover:text-orange-700"
            >
              Temizle
            </button>
          </div>

          {/* Liste */}
          <ul className="flex flex-col">
            {history.map((term, index) => (
              <li
                key={index}
                onClick={() => {
                  setQuery(term);
                  handleSearch(undefined, term);
                }}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-orange-50 cursor-pointer transition-colors group/item"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <BiTime className="text-gray-400 min-w-4" />
                  <span className="text-sm text-gray-700 truncate">{term}</span>
                </div>

                <button
                  onClick={(e) => removeFromHistory(e, term)}
                  className="p-1 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover/item:opacity-100 transition-all"
                  title="Geçmişten sil"
                >
                  <BiX size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderInput;
