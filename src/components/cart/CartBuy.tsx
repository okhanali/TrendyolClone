'use client';

import { FC, useMemo, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { Check, Loader2, Ticket, X, AlertCircle, ShoppingCart } from 'lucide-react';
import { ICoupon } from '@/types/types';
import { toast } from 'react-toastify';
import { auth } from '@/services/firebase';
import { validateCouponService } from '@/services/couponsService';
import { CART_HIGHLIGHTS_DATA } from '@/constants';
import InformationSlider from '../ui/InformationSlider';

const CartBuy: FC = () => {
  const { cartItems, proceedToCheckout, isLoading: isCartLoading } = useCart();

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<ICoupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);

  // Hesaplamalar
  const subTotal = useMemo(() => {
    return cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  }, [cartItems]);

  const SHIPPING_THRESHOLD = 200;
  const STANDARD_SHIPPING_COST = 29.99;
  const shippingCost = subTotal >= SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (subTotal < appliedCoupon.minCartAmount) return 0;

    if (appliedCoupon.type === 'fixed') return appliedCoupon.discountAmount || 0;
    if (appliedCoupon.type === 'percentage')
      return subTotal * ((appliedCoupon.discountPercentage || 0) / 100);
    return 0;
  }, [subTotal, appliedCoupon]);

  const total = Math.max(0, subTotal + shippingCost - discountAmount);

  // Coupon Handlers
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    const user = auth.currentUser;
    if (!user) {
      toast.info('Kupon kullanmak için giriş yapmalısınız.');
      return;
    }

    setIsCheckingCoupon(true);
    setCouponError(null);

    try {
      const coupon = await validateCouponService(couponCode, user.uid);

      if (!coupon) {
        setCouponError('Geçersiz veya süresi dolmuş kupon.');
        setAppliedCoupon(null);
      } else if (subTotal < coupon.minCartAmount) {
        setCouponError(`Min. sepet tutarı ${formatPrice(coupon.minCartAmount)} olmalı.`);
        setAppliedCoupon(null);
      } else {
        setAppliedCoupon(coupon);
        setIsInputVisible(false);
        toast.success('Kupon başarıyla uygulandı!');
      }
    } catch (error) {
      setCouponError('Kupon servisinde hata oluştu.');
    } finally {
      setIsCheckingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError(null);
  };

  if (!cartItems || cartItems.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Sipariş Özeti</h3>

        {/* Ücret Detayları */}
        <div className="space-y-3 text-sm text-gray-600 mb-6">
          <div className="flex justify-between items-center">
            <span>Ürünün Toplamı</span>
            <span className="font-semibold text-gray-900">{formatPrice(subTotal)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Kargo Toplam</span>
            <span
              className={
                shippingCost === 0 ? 'text-green-600 font-bold' : 'font-semibold text-gray-900'
              }
            >
              {shippingCost === 0 ? 'Bedava' : formatPrice(shippingCost)}
            </span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between items-center text-green-600 animate-in fade-in slide-in-from-right-2">
              <div className="flex items-center gap-1">
                <Ticket size={14} />
                <span>Kupon İndirimi</span>
              </div>
              <span className="font-bold">-{formatPrice(discountAmount)}</span>
            </div>
          )}

          {/* Kargo Tamamlama Barı */}
          {shippingCost > 0 && (
            <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-orange-700 font-medium">
                <AlertCircle size={14} />
                <span>Kargo Bedava için {formatPrice(SHIPPING_THRESHOLD - subTotal)} kaldı!</span>
              </div>
              <div className="w-full bg-orange-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full transition-all duration-500 ease-out"
                  style={{ width: `${(subTotal / SHIPPING_THRESHOLD) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Kupon Yönetimi */}
        <div className="mb-6">
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
                <Ticket size={16} />
                <span>{appliedCoupon.code}</span>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : isInputVisible ? (
            <div className="flex flex-col gap-2 animate-in fade-in duration-300">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Kupon Kodu"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500 transition-all uppercase"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={isCheckingCoupon}
                  className="bg-gray-900 text-white px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
                >
                  {isCheckingCoupon ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Check size={18} />
                  )}
                </button>
              </div>
              {couponError && (
                <span className="text-[11px] text-red-500 font-medium pl-1">{couponError}</span>
              )}
              <button
                onClick={() => setIsInputVisible(false)}
                className="text-xs text-gray-400 underline self-start hover:text-gray-600"
              >
                Vazgeç
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsInputVisible(true)}
              className="flex items-center gap-2 text-orange-600 font-bold text-sm hover:text-orange-700 transition-colors"
            >
              <Ticket size={18} />
              <span>İndirim Kodu Gir</span>
            </button>
          )}
        </div>

        <hr className="border-gray-100 mb-4" />

        {/* Son Tutar */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-gray-700 uppercase text-xs tracking-wider">
            Ödenecek Tutar
          </span>
          <span className="font-black text-2xl text-orange-600 tracking-tight">
            {formatPrice(total)}
          </span>
        </div>

        <button
          onClick={proceedToCheckout}
          disabled={isCartLoading}
          className="w-full bg-orange-600 text-white py-4 rounded-xl font-extrabold text-lg hover:bg-orange-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-orange-100"
        >
          {isCartLoading ? 'İşlem Yapılıyor...' : 'Alışverişi Tamamla'}
        </button>
      </div>

      {/* --- CART HIGHLIGHTS SLIDER --- */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 shadow-sm">
        <InformationSlider
          items={CART_HIGHLIGHTS_DATA.map((h) => ({
            id: `summary-hl-${h.id}`,
            text: h.text,
            icon: <h.icon className="w-4 h-4 text-blue-600" />,
          }))}
          textColor="text-blue-800"
          className="font-medium text-[13px]"
        />
      </div>
    </div>
  );
};

export default CartBuy;
