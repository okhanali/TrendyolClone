import { Star, StarHalf } from 'lucide-react';
import { FC } from 'react';

interface Props {
  rating: number;
  maxStars?: number;
  size?: number;
}

const StarRating: FC<Props> = ({ rating, maxStars = 5, size = 14 }) => {
  const safeRating = rating || 0;

  const fullStars = Math.floor(safeRating);

  const hasHalfStar = safeRating % 1 >= 0.5;

  return (
    <div className="flex items-center space-x-0.5">
      {Array.from({ length: maxStars }).map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} size={size} className="fill-yellow-400 text-yellow-400" />;
        }

        if (hasHalfStar && i === fullStars) {
          return (
            <div key={i} className="relative">
              <StarHalf size={size} className="fill-yellow-400 text-yellow-400" />
            </div>
          );
        }

        return <Star key={i} size={size} className="fill-gray-200 text-gray-200" />;
      })}
    </div>
  );
};

export default StarRating;
