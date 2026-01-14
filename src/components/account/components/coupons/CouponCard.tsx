'use client';

import { ICoupon } from '@/types/types';
import { Check, Copy, Ticket } from 'lucide-react';
import { FC, useState } from 'react';

interface CouponCardProps {
  coupon: ICoupon;
}

const CouponCard: FC<CouponCardProps> = ({ coupon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  return (
    <div className="relative flex flex-col border border-dashed border-gray-300 rounded-xl p-5 hover:border-orange-500 hover:shadow-md transition-all duration-300 bg-gray-50 group h-full justify-between">
      {/* Sol Üst  */}
      <div className="absolute top-4 right-4 text-gray-200 group-hover:text-orange-100 transition-colors duration-300">
        <Ticket size={48} />
      </div>

      {/* İndirim Miktarı */}
      <div className="mb-3 relative z-10">
        <div className="flex items-baseline gap-1 text-orange-600 font-bold">
          {coupon.type === 'fixed' ? (
            <span className="text-3xl tracking-tight">
              {coupon.discountAmount}
              <span className="text-lg">TL</span>
            </span>
          ) : (
            <span className="text-3xl tracking-tight">%{coupon.discountPercentage}</span>
          )}
          <span className="text-sm font-medium text-gray-500 ml-1">İndirim</span>
        </div>
        <h3 className="text-sm font-medium text-gray-800 mt-1 line-clamp-1">Sepet İndirimi</h3>
      </div>

      {/* Alt Limit Bilgisi */}
      <p className="text-xs text-gray-500 mb-5 relative z-10">
        {coupon.minCartAmount > 0
          ? `${coupon.minCartAmount.toLocaleString('tr-TR')} TL ve üzeri alışverişlerde`
          : 'Alt limit yok, tüm ürünlerde geçerli'}
      </p>

      {/* Kupon Kodu Alanı */}
      <div
        onClick={handleCopy}
        className="mt-auto bg-white border border-gray-200 rounded-lg p-2.5 flex items-center justify-between cursor-pointer active:scale-95 transition-transform hover:border-orange-300 group/btn"
      >
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">
            KUPON KODU
          </span>
          <span className="font-mono font-bold text-gray-700 tracking-widest text-sm">
            {coupon.code}
          </span>
        </div>

        <div
          className={`p-2 rounded-full transition-colors ${
            copied
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-500 group-hover/btn:text-orange-600 group-hover/btn:bg-orange-50'
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </div>
      </div>

      {/* Tooltip */}
      {copied && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-3 rounded shadow-lg animate-in fade-in zoom-in duration-200">
          Kopyalandı!
        </div>
      )}
    </div>
  );
};

export default CouponCard;
