'use client';

import { formatDate } from '@/lib/formatdate';
import { IReview } from '@/types/types';
import { FC } from 'react';

interface Props {
  review: IReview;
}

const ReviewCard: FC<Props> = ({ review }) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex gap-2 items-center">
          <h3 className="text-primary font-medium">Name: </h3>
          <span className="text-sm font-semibold">{review.userFullName}</span>
          <div className="flex gap-2 items-center">
            <h3 className="text-primary font-medium">Ürün: </h3>
            <span className="text-sm font-semibold">{review.product}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <h3 className="text-primary font-medium">Yorum: </h3>
          <span className="text-sm font-semibold">{review.comment}</span>
        </div>
        <div className="flex gap-2 items-center">
          <h3 className="text-primary font-medium">Tarih: </h3>
          <span className="text-sm font-semibold">{formatDate(review.date)}</span>
        </div>
      </div>
      <hr className="mt-2 border-t border-black" />
    </div>
  );
};

export default ReviewCard;
