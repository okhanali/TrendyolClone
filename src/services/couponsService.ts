import { ICoupon } from '@/types/types';
import dbData from '../../db.json';

export const getCoupons = async (userId: string): Promise<ICoupon[]> => {
  const coupons = (dbData.coupons as unknown as ICoupon[]) || [];
  return new Promise((resolve) => setTimeout(() => resolve(coupons), 100));
};

export const validateCouponService = async (
  code: string,
  userId: string
): Promise<ICoupon | null> => {
  const coupons = (dbData.coupons as unknown as ICoupon[]) || [];

  const coupon = coupons.find((c) => c.code === code);

  if (coupon && coupon.isActive !== false) {
    return new Promise((resolve) => setTimeout(() => resolve(coupon), 200));
  }

  return new Promise((resolve) => setTimeout(() => resolve(null), 200));
};
