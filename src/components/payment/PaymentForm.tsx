'use client';

import { usePayment } from '@/hooks/usePayment';
import { CardFocused, IPaymentState } from '@/types/types';
import { Loader2, Lock, ShieldCheck } from 'lucide-react';
import { FC, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { toast } from 'react-toastify';
import PaymentInput from './PaymentInput';

const PaymentForm: FC = () => {
  const { handlePayment, isLoading } = usePayment();
  const [state, setState] = useState<IPaymentState>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = evt.target;

    // --- INPUT MASKING & FILTERING ---
    if (name === 'number') {
      value = value.replace(/\D/g, '');
    } else if (name === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        const month = parseInt(value.substring(0, 2));
        if (month > 12) value = '12' + value.substring(2);
        if (month === 0) value = '01' + value.substring(2);
      }
    } else if (name === 'cvc') {
      value = value.replace(/\D/g, '');
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name as CardFocused }));
  };

  const validateForm = () => {
    const { number, expiry, cvc, name } = state;

    // Kart No Kontrolü
    if (number.length < 16) {
      toast.error('Geçerli bir kart numarası giriniz.');
      return false;
    }

    // Tarih Validasyonu
    if (expiry.length < 4) {
      toast.error('Son kullanma tarihini (AAYY) eksiksiz giriniz.');
      return false;
    }

    const month = parseInt(expiry.substring(0, 2));
    const year = parseInt('20' + expiry.substring(2, 4));
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (month < 1 || month > 12) {
      toast.error('Geçersiz ay girişi.');
      return false;
    }

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      toast.error('Kartın son kullanma tarihi geçmiş.');
      return false;
    }

    // CVC Kontrolü
    if (cvc.length < 3) {
      toast.error('CVC kodu en az 3 haneli olmalıdır.');
      return false;
    }

    if (!name.trim()) {
      toast.error('Kart üzerindeki ismi giriniz.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handlePayment(state);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 sm:p-8 w-full max-w-lg mx-auto bg-white rounded-xl shadow-xl border border-gray-100 transition-all">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Lock size={22} className="text-green-600" />
          <span>Güvenli Ödeme</span>
        </h2>
        <p className="text-gray-500 text-sm">Kart bilgilerinizi şifreli altyapımızla giriniz.</p>
      </div>

      <div className="w-full flex justify-center mb-2 transform scale-90 sm:scale-100 origin-center transition-transform duration-300">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
          placeholders={{ name: 'AD SOYAD' }}
          locale={{ valid: 'SKT' }}
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <PaymentInput
          label="KART ÜZERİNDEKİ İSİM"
          name="name"
          placeholder="AD SOYAD"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength={30}
          type="text"
          autoComplete="cc-name"
          required
        />

        <PaymentInput
          label="KART NUMARASI"
          name="number"
          placeholder="0000 0000 0000 0000"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength={16}
          type="tel"
          inputMode="numeric"
          autoComplete="cc-number"
          required
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <PaymentInput
              label="SON KULLANMA (AAYY)"
              name="expiry"
              placeholder="01/25"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={4}
              type="tel"
              inputMode="numeric"
              autoComplete="cc-exp"
              required
            />
          </div>

          <div className="flex-1">
            <PaymentInput
              label="CVC / CVV"
              name="cvc"
              placeholder="123"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={4}
              type="tel"
              inputMode="numeric"
              autoComplete="cc-csc"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group mt-2 w-full flex items-center justify-center gap-3 py-4 px-4 border border-transparent rounded-lg shadow-lg shadow-orange-200 text-base font-bold text-white bg-orange-600 hover:bg-orange-700 hover:shadow-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>İşlem Yapılıyor...</span>
            </>
          ) : (
            <>
              <span>Ödemeyi Tamamla</span>
              <ShieldCheck
                size={18}
                className="opacity-80 group-hover:scale-110 transition-transform"
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
