import { IReview } from '@/types/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Ürün yorumlarını getir
export const getReview = async (userId: string): Promise<IReview[]> => {
  const res = await fetch(`${BASE_URL}/reviews?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Yorumlar Getirilemedi');

  return (await res.json()) as IReview[];
};
