import { IProductFeature } from '@/types/types';
import { FC } from 'react';

interface Props {
  features: IProductFeature[];
}

const ProductDetailFeatures: FC<Props> = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
      <h3 className="mb-3 font-bold text-sm text-gray-800">Öne Çıkan Özellikler</h3>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {features.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-center p-2.5 sm:p-3 bg-white rounded-lg border border-gray-100 shadow-sm h-full"
          >
            <span className="text-gray-500 text-[9px] sm:text-[10px] font-medium uppercase tracking-wide mb-1">
              {item.key}
            </span>
            <span className="text-gray-900 text-[11px] sm:text-xs font-semibold leading-tight wrap-break-word">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailFeatures;
