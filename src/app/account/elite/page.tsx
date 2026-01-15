import { ELITE_ITEMS } from '@/constants';
import { FC, useMemo } from 'react';
import { BiDiamond } from 'react-icons/bi';
import { FaCalculator, FaStar } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface ElitePageProps {
  currentScore?: number;
}

const TARGET_SCORE = 2000;

const ElitePage: FC<ElitePageProps> = ({ currentScore = 0 }) => {
  const { progressPercentage, remainingScore } = useMemo(() => {
    return {
      progressPercentage: Math.min((currentScore / TARGET_SCORE) * 100, 100),
      remainingScore: Math.max(TARGET_SCORE - currentScore, 0),
    };
  }, [currentScore]);

  return (
    <article className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- HEADER SECTION --- */}
      <header className="border px-6 py-10 rounded-2xl flex flex-col justify-center bg-linear-to-br from-orange-100 via-orange-50 to-white relative overflow-hidden shadow-sm">
        <div
          className="absolute top-0 right-0 w-48 h-48 bg-orange-200/30 rounded-full blur-3xl -mr-16 -mt-16"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-8 z-10">
          <h1 className="flex items-center gap-3 text-primary font-extrabold text-2xl md:text-3xl tracking-tight">
            Trendyol Elite
            <span className="text-blue-600 bg-blue-100 p-1.5 rounded-full shadow-inner ring-4 ring-blue-50">
              <BiDiamond size={24} />
            </span>
          </h1>

          <nav
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-orange-200"
            aria-label="Elite Avantajları"
          >
            {ELITE_ITEMS.filter((item) => !item.titleBottom).map((item, i) => (
              <div key={i} className="flex flex-col min-w-40 md:min-w-50 snap-start">
                <div className={`flex items-center gap-2 mb-3 ${item.color || 'text-gray-700'}`}>
                  {item.iconTop && <item.iconTop className="w-5 h-5 shrink-0" />}
                  <h2 className="text-gray-900 font-bold text-sm truncate">{item.titleTop}</h2>
                </div>

                <div className="flex items-start relative ml-2 pl-4 border-l-2 border-orange-200 h-full">
                  <div
                    className={`${
                      item.dotColor || 'bg-orange-400'
                    } h-3 w-3 rounded-full absolute -left-1.75 top-0 ring-4 ring-white shadow-sm`}
                  />
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* --- SCORE & INFO SECTION --- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5" aria-label="Puan Durumu">
        {/* Puan Durumu Kartı */}
        <div className="p-6 border border-gray-100 flex flex-col justify-between rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-linear-to-tr from-yellow-500 to-amber-400 rounded-2xl h-12 w-12 flex items-center justify-center shadow-lg transform -rotate-3">
                <FaStar className="text-white text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-wrap">
                  Mevcut Puanın
                </span>
                <span className="text-3xl font-black text-gray-900 tabular-nums">
                  {currentScore.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              className="w-full sm:w-auto text-orange-600 text-sm font-bold flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 px-4 py-2.5 rounded-xl transition-all group"
              aria-label="Sipariş geçmişini görüntüle"
            >
              Sipariş Geçmişi
              <MdOutlineKeyboardArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col w-full space-y-3">
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden p-1 shadow-inner">
              <div
                className="bg-linear-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)"
                style={{ width: `${progressPercentage}%` }}
                role="progressbar"
                aria-valuenow={currentScore}
                aria-valuemin={0}
                aria-valuemax={TARGET_SCORE}
              ></div>
            </div>

            <div className="flex items-center justify-between font-bold text-xs text-gray-400 px-1">
              <span>{currentScore} Puan</span>
              <span className="text-orange-600">{TARGET_SCORE} Elite</span>
            </div>
          </div>
        </div>

        {/* Bilgilendirme Kartı */}
        <div className="border border-gray-100 p-6 flex flex-col justify-center rounded-2xl bg-slate-50/50 space-y-6">
          <div className="flex items-center gap-5">
            <div className="bg-white border border-gray-200 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transform rotate-3">
              <BiDiamond className="text-blue-500 text-2xl" />
            </div>
            <p className="text-sm md:text-base text-gray-700 font-medium leading-snug">
              Elit Üyeliğe ulaşmak için toplam <br className="hidden md:block" />
              <mark className="bg-transparent text-orange-600 font-bold p-0">
                {remainingScore.toLocaleString()} puan
              </mark>{' '}
              daha toplamalısın.
            </p>
          </div>

          <aside className="flex gap-3 items-start bg-blue-50/80 p-4 rounded-xl border border-blue-100/50 backdrop-blur-sm">
            <IoIosInformationCircleOutline className="size-6 text-blue-500 shrink-0" />
            <p className="text-xs text-blue-800 font-medium leading-relaxed">
              Yorum sonrası kazandığınız puanların yansıması 3 saate kadar sürebilir. Lütfen bu süre
              sonunda tekrar kontrol ediniz.
            </p>
          </aside>
        </div>
      </section>

      {/* --- NASIL PUAN KAZANIRIM: CTA Section --- */}
      <section className="border border-red-100 p-5 bg-linear-to-r from-red-50 to-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="bg-red-500 p-3 rounded-xl shadow-md shadow-red-200">
            <FaCalculator className="text-white text-lg" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-gray-900">Nasıl Puan Kazanırım?</h3>
            <p className="text-xs text-gray-500">Kazanım detaylarını ve çarpanları incele</p>
          </div>
        </div>

        <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold bg-white border border-gray-200 px-6 py-3 rounded-xl hover:border-orange-400 hover:text-orange-600 transition-all shadow-sm active:scale-95">
          Hesaplamayı Gör
          <MdOutlineKeyboardArrowRight className="text-gray-400" />
        </button>
      </section>

      {/* --- ALT GRID: Perks Section --- */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
        aria-label="Elite Ayrıcalıkları"
      >
        {ELITE_ITEMS.filter((item) => item.titleBottom).map((item, i) => (
          <article
            key={i}
            className="border border-gray-100 p-4 rounded-2xl bg-white hover:border-orange-400 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {item.icon && (
                <div
                  className={`${
                    item.iconColor || 'bg-gray-50 text-gray-600'
                  } w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
              )}
              <h4 className="text-[13px] font-bold text-gray-700 group-hover:text-orange-600 transition-colors leading-tight">
                {item.titleBottom}
              </h4>
            </div>

            {item.point && (
              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                <FaStar className="text-amber-500 text-[10px]" />
                <span className="text-xs font-black text-amber-700">+{item.point}</span>
              </div>
            )}
          </article>
        ))}
      </section>
    </article>
  );
};

export default ElitePage;
