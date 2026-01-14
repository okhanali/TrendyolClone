'use client';

import {
  FOOTER_APPLICATION,
  FOOTER_CERTIFICATE,
  FOOTER_ICONS,
  FOOTER_LINKS,
  FOOTER_PAY_IMAGE,
} from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ChevronDown } from 'lucide-react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  const companyName = 'Front-End Clone E-Ticaret';
  return (
    <footer className="w-full mt-10">
      {/* --- ÜST KISIM --- */}
      <div className="py-12 bg-[#F5F5F5] border-t border-gray-200 text-sm">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {FOOTER_LINKS.map((item, i) => (
            <div className="flex flex-col gap-4" key={i}>
              <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {[item.link1, item.link2, item.link3, item.link4].map(
                  (link, idx) =>
                    link && (
                      <li key={idx}>
                        <Link
                          href="#"
                          className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                        >
                          {link}
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </div>
          ))}

          {/* Sağ Taraf  */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            {/* Ülke Seçimi */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-gray-900 text-base">Ülke Değiştir</h3>
              <div className="relative w-full">
                <select
                  name="country"
                  id="country"
                  className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-10 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 cursor-pointer transition-all text-sm font-medium"
                  defaultValue="TR"
                >
                  <option value="TR">Türkiye</option>
                  <option value="AZ">Azerbaycan</option>
                  <option value="DE">Almanya</option>
                  <option value="US">ABD</option>
                </select>
                {/* Custom Ok İkonu */}
                <ChevronDown
                  className="absolute right-3 top-3 text-gray-500 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Güvenli Alışveriş */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-gray-900 text-base">Güvenli Alışveriş</h3>
              <div className="flex flex-wrap gap-2">
                {FOOTER_PAY_IMAGE.map((item) => (
                  <div
                    key={item.id}
                    className="relative w-12 h-7 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt="payment-method"
                      fill
                      sizes="48px"
                      className="object-contain p-0.5"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sertifikalar */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2 items-center">
                {FOOTER_CERTIFICATE.map((item) => (
                  <div
                    key={item.id}
                    className="relative w-10 h-10 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={item.image}
                      alt="certificate"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- ALT KISIM  --- */}
      <div className="bg-black py-6 text-white text-xs">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Sosyal Medya & Copyright */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="flex gap-4">
              {FOOTER_ICONS.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="bg-white/10 p-2 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 group"
                >
                  <item.icon className="w-4 h-4 text-white" />
                </Link>
              ))}
            </div>
            <p className="text-gray-400 font-medium text-xs text-center md:text-left">
              © {currentYear} {companyName} Danışmanlık İletişim ve Satış Tic. A.Ş. - Her Hakkı
              Saklıdır.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-5">
            <div className="flex gap-3">
              {FOOTER_APPLICATION.map((item) => (
                <Link
                  href="#"
                  key={item.id}
                  className="relative w-32 h-10 block hover:opacity-90 transition-opacity rounded-full"
                >
                  <Image
                    src={item.image}
                    alt="mobile-app"
                    fill
                    sizes="(max-width: 768px) 128px, 128px"
                    className="object-contain rounded-full "
                  />
                </Link>
              ))}
            </div>

            {/* Yasal Linkler */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-2 text-gray-400 font-medium">
              {[
                'Kariyer',
                'Kullanım Koşulları',
                'Gizlilik ve Çerez Politikası',
                'KVKK',
                'İşlem Rehberi',
              ].map((text, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="hover:text-white hover:underline transition-all"
                >
                  {text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
