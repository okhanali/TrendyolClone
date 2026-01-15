import Link from 'next/link';
import { Home, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-white">
      {/* İkon Alanı - Animasyonlu ve Şık */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-orange-100 rounded-full scale-110 animate-pulse opacity-50 blur-xl"></div>
        <div className="relative bg-orange-50 p-8 rounded-full border-2 border-orange-100 shadow-sm">
          <SearchX className="w-16 h-16 text-orange-500" strokeWidth={1.5} />
        </div>
      </div>

      {/* Başlık ve Açıklama */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
        Aradığınız Sayfayı Bulamadık
      </h1>
      <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
        Üzgünüz, gitmeye çalıştığınız sayfa silinmiş, taşınmış veya bağlantı hatalı olabilir.
      </p>

      {/* Butonlar */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Home size={20} />
          Ana Sayfaya Dön
        </Link>

        <Link
          href="/search"
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-orange-200 hover:bg-orange-50 text-gray-700 hover:text-orange-600 px-8 py-3.5 rounded-lg font-semibold transition-all duration-200"
        >
          <SearchX size={20} />
          Ürün Ara
        </Link>
      </div>

      {/* Alt Bilgi */}
      <p className="mt-12 text-sm text-gray-400">Hata Kodu: 404 | Trendyol Clone</p>
    </div>
  );
}
