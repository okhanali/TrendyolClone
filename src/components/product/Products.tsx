import { IProducts } from '@/types/types';
import { FC } from 'react';
import ProductCard from '../ui/ProductCard';

interface Props {
  productList: IProducts[];
}

const Products: FC<Props> = ({ productList }) => {
  if (!productList || productList.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <div className="text-4xl mb-4 grayscale opacity-40">📦</div>
        <h3 className="text-lg font-semibold text-gray-700">Ürün Bulunamadı</h3>
        <p className="text-gray-500 text-sm mt-1">Bu kategoride henüz ürün listelenmiyor.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {productList.slice(0, 10).map((product) => (
        <div key={product.id} className="h-full">
          <ProductCard item={product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
