import { IReview } from '@/types/types';
import dbData from '../../db.json';

export const getReview = async (userId: string): Promise<IReview[]> => {
  const reviews = (dbData.reviews as unknown as IReview[]) || [];

  return new Promise((resolve) => {
    setTimeout(() => resolve(reviews), 100);
  });
};
