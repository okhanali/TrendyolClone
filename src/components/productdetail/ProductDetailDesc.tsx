import { FC } from 'react';

interface Props {
  description: string[];
}

const ProductDetailDesc: FC<Props> = ({ description }) => {
  if (!description || description.length === 0) return null;

  return (
    <div className="mt-6 mb-8">
      <ul className="space-y-3">
        {description.map((detail, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 mt-2 rounded-full bg-orange-500 shrink-0" />
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetailDesc;
