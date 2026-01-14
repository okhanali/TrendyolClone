import { ELITE_ITEMS } from '@/constants';
import { FC } from 'react';
import { BiDiamond } from 'react-icons/bi';
import { FaCalculator, FaStar } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface ElitePageProps {
  currentScore?: number;
}

const ElitePage: FC<ElitePageProps> = ({ currentScore = 0 }) => {
  const targetScore = 2000;
  const progressPercentage = Math.min((currentScore / targetScore) * 100, 100);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      {/* --- HEADER SECTION --- */}
      <div className="border px-6 py-8 rounded-xl flex flex-col justify-center bg-linear-to-l from-orange-100 to-orange-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/40 rounded-full blur-3xl -mr-10 -mt-10"></div>

        <div className="flex flex-col gap-6 z-10">
          <h1 className="flex items-center gap-2 text-primary font-bold text-2xl">
            Trendyol Elite
            <span className="text-blue-500 bg-blue-100 p-1 rounded-full">
              <BiDiamond size={20} />
            </span>
          </h1>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {ELITE_ITEMS.map(
              (item, i) =>
                // Üst Kısım
                !item.titleBottom && (
                  <div key={i} className="flex flex-col min-w-35">
                    <div
                      className={`flex items-center gap-2 whitespace-nowrap ${
                        item.color || 'text-gray-700'
                      }`}
                    >
                      <span>{item.iconTop && <item.iconTop className="w-5 h-5" />}</span>
                      <span className="text-gray-600 font-medium text-sm">{item.headTop}</span>
                      <h3 className="font-bold text-gray-900 text-sm">{item.titleTop}</h3>
                    </div>

                    <div className="flex items-start relative mt-3 ml-2 pl-4 border-l-2 border-gray-200">
                      <div
                        className={`${
                          item.dotColor || 'bg-gray-300'
                        } h-2.5 w-2.5 rounded-full absolute -left-1.25 top-0 ring-2 ring-white`}
                      />
                      <span className="text-xs text-gray-500 leading-tight">
                        {item.description}
                      </span>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {/* --- SCORE & INFO SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Puan Durumu Kartı */}
        <div className="p-6 border border-gray-200 flex flex-col justify-between rounded-xl bg-white shadow-sm h-full">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center shadow-sm">
                <FaStar className="text-white text-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-semibold uppercase">Mevcut Puanın</span>
                <span className="text-xl font-bold text-gray-900">{currentScore}</span>
              </div>
            </div>

            <button className="text-orange-600 text-sm font-semibold flex items-center gap-1 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors group">
              Sipariş Geçmişi
              <MdOutlineKeyboardArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col w-full mt-auto">
            {/* Dinamik Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
              <div
                className="bg-orange-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between font-medium text-xs text-gray-500">
              <span>{currentScore}</span>
              <span>{targetScore} Elite</span>
            </div>
          </div>
        </div>

        {/* Bilgilendirme Kartı */}
        <div className="border border-gray-200 p-6 flex flex-col justify-center rounded-xl bg-gray-50/50">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <BiDiamond className="text-blue-500 text-lg" />
            </div>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              Elit Üyeliğe ulaşmak için toplam{' '}
              <span className="font-bold text-black">{targetScore - currentScore} puan</span> daha
              toplamalısın.
            </p>
          </div>

          <div className="flex gap-3 items-start bg-blue-50 p-3 rounded-lg border border-blue-100">
            <IoIosInformationCircleOutline className="size-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-snug">
              Yorum sonrası kazandığınız puanların yansıması 3 saate kadar sürebilir.
            </p>
          </div>
        </div>
      </div>

      {/* --- NASIL PUAN KAZANIRIM --- */}
      <div className="border border-red-100 p-4 bg-red-50/50 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <FaCalculator className="text-red-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 text-sm">Nasıl Puan Kazanırım?</span>
            <span className="text-xs text-gray-500">Puanlama sistemini detaylı incele</span>
          </div>
        </div>

        <button className="flex items-center gap-2 text-xs font-semibold bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
          Hesaplamayı Gör
          <MdOutlineKeyboardArrowRight className="text-gray-400" />
        </button>
      </div>

      {/* --- ALT GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {ELITE_ITEMS.map((item, i) =>
          item.titleBottom ? (
            <div
              key={i}
              className="border border-gray-200 p-4 rounded-xl bg-white hover:border-orange-400 hover:shadow-lg hover:shadow-orange-100 transition-all duration-300 cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <div
                    className={`${
                      item.iconColor || 'bg-gray-100 text-gray-600'
                    } w-10 h-10 rounded-lg flex items-center justify-center transition-colors`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                )}
                <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                  {item.titleBottom}
                </span>
              </div>

              {item.point && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                  <FaStar className="text-yellow-400 text-xs" />
                  <span className="text-sm font-bold text-gray-800">+{item.point}</span>
                </div>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default ElitePage;
