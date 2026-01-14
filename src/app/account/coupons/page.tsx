import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import { TicketPercent } from 'lucide-react';
import CouponCard from '@/components/account/components/coupons/CouponCard';
import { getCoupons } from '@/services/couponsService';

export const dynamic = 'force-dynamic';

const CouponsPage: FC = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get('firebase-uid')?.value;

  if (!userId) {
    redirect('/login?returnUrl=/account/coupons');
  }

  const coupons = await getCoupons(userId);

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Başlık Alanı */}
      <div className="w-full bg-white p-5 shadow-sm border border-gray-100 rounded-xl flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <TicketPercent className="text-orange-600" size={24} />
          Kuponlarım
        </h2>
        <span className="text-xs font-medium px-3 py-1 bg-orange-50 text-orange-700 rounded-full border border-orange-100">
          Toplam {coupons.length} adet
        </span>
      </div>

      {/* Kupon Listesi */}
      <div className="w-full bg-white p-6 shadow-sm border border-gray-100 rounded-xl min-h-75">
        {coupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10 text-gray-400 gap-3">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <TicketPercent size={32} className="opacity-20" />
            </div>
            <p>Hesabınıza tanımlı aktif kupon bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {coupons.map((item) => (
              <CouponCard key={item.id} coupon={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsPage;
