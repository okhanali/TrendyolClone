'use client';

import { CheckCircle, Home, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  orderId: string;
}

const PaymentSuccessCard: FC<Props> = ({ orderId }) => {
  const displayOrderId = orderId.slice(0, 8).toUpperCase();

  return (
    <div className="max-w-md w-full bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-50 text-center animate-in fade-in zoom-in duration-500">
      {/* Başarı İkonu ve Animasyonu */}
      <div className="mx-auto flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-50 rounded-full mb-8 relative">
        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25 duration-1000"></div>
        <CheckCircle className="w-12 h-12 text-green-600 relative z-10 drop-shadow-sm" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 tracking-tight">
        SİPARİŞİNİZ ALINDI!
      </h1>

      <p className="text-gray-500 mb-8 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
        Teşekkürler, ödemeniz başarıyla gerçekleşti. Siparişiniz hazırlanmak üzere satıcıya
        iletildi.
      </p>

      {/* Sipariş No Kartı */}
      <div className="bg-gray-50/80 rounded-2xl p-6 mb-8 border border-gray-100 border-dashed relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500 transition-all duration-300 group-hover:w-2"></div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">
          Sipariş Numarası
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl font-mono font-bold text-gray-800 tracking-wider select-all">
            #{displayOrderId}...
          </span>
        </div>
      </div>

      {/* Aksiyon Butonları */}
      <div className="space-y-3">
        {/* Siparişlere Git */}
        <Link
          href="/account/orders?tab=all"
          className="group flex items-center justify-center w-full gap-3 px-6 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-lg shadow-orange-100 hover:-translate-y-0.5 transition-all duration-200"
        >
          <Package size={20} />
          <span>Siparişlerime Git</span>
          <ArrowRight
            size={18}
            className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
          />
        </Link>

        {/* Anasayfaya Dön */}
        <Link
          href="/"
          className="flex items-center justify-center w-full gap-3 px-6 py-4 bg-white border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all duration-200"
        >
          <Home size={20} />
          <span>Alışverişe Devam Et</span>
        </Link>
      </div>

      <footer className="mt-8 pt-6 border-t border-gray-50">
        <p className="text-[11px] text-gray-400 font-medium">
          Sipariş detayları ve faturanız kayıtlı e-posta adresinize gönderilmiştir.
        </p>
      </footer>
    </div>
  );
};

export default PaymentSuccessCard;
