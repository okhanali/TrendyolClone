import { getProducts } from '@/services/services';
import { FC } from 'react';
import YouInterestedHeadSlider from './YouInterestedHeadSlider';

const YouInterestedHead: FC = async () => {
  const data = await getProducts();

  return (
    <section className="flex flex-col gap-4 py-6 border-t border-gray-100">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight mb-2">
        Bunlar da İlginizi Çekebilir
      </h2>
      <YouInterestedHeadSlider products={data} />
    </section>
  );
};

export default YouInterestedHead;
