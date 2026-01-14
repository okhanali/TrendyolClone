import { getReview } from '@/services/reviewService';
import { FC } from 'react';

interface Props {
  userId: string;
}

const ReviewFilterTabs: FC<Props> = async ({ userId }) => {
  const review = await getReview(userId);

  console.log('Server Side Reviews:', review);

  return (
    <div className="flex gap-4 border-b border-gray-100 pb-2 w-full">
      <button className="border-b-2 border-orange-600 text-orange-600 px-4 py-2 font-semibold text-sm transition-colors">
        Değerlendirmelerim {review ? `(${review.length})` : ''}
      </button>
    </div>
  );
};

export default ReviewFilterTabs;
