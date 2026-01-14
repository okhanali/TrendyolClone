'use client';

import { IReview } from '@/types/types';
import { Loader2, ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { getReview } from '@/services/reviewService';

interface Props {
  userId: string;
}

const ReviewTracking: FC<Props> = ({ userId }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        setReviews([]);
        setError(null);

        // Servisten veriyi çek
        const data = await getReview(userId);

        setReviews(data);
      } catch (error) {
        console.error(error);
        setError('Yorumlar getirilemedi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading)
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="animate-spin text-orange-600 text-center" />
      </div>
    );

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 w-full text-center">
        <div className="bg-orange-50 p-4 rounded-full">
          <ShoppingBagIcon className="w-8 h-8 text-orange-500" />
        </div>
        <p className="text-gray-500 text-sm">Bu kategoride henüz bir yorumunuz bulunmuyor.</p>
        <Link
          href="/"
          className="text-white bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((item) => (
        <ReviewCard key={item.id} review={item} />
      ))}
    </div>
  );
};

export default ReviewTracking;
