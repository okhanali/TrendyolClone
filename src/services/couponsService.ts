import { ICoupon } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const getCoupons = async (userId: string): Promise<ICoupon[]> => {
  try {
    const response = await fetch(`${API_URL}/coupons?userId=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Kupon listesi alınamadı');
    }

    const data: ICoupon[] = await response.json();
    return data;
  } catch (error) {
    console.error('getCoupons Service Error:', error);
    return [];
  }
};

export const validateCouponService = async (
  code: string,
  userId: string
): Promise<ICoupon | null> => {
  try {
    const response = await fetch(`${API_URL}/coupons?code=${code}&userId=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Kupon sorgulanamadı');

    const data: ICoupon[] = await response.json();

    if (data.length > 0) {
      const coupon = data[0];
      if (coupon.isActive === false) return null;
      return coupon;
    }

    return null;
  } catch (error) {
    console.error('Coupon Service Error:', error);
    throw error;
  }
};
