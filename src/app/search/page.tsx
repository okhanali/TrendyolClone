import { searchProducts } from '@/services/api';
import ProductCard from '@/components/ui/ProductCard';
import { IProducts } from '@/types/types';
import { FC } from 'react';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q as string | undefined;

  const containerClass = 'container mx-auto px-4 pt-28 pb-10 min-h-screen';

  console.log('Gelen Arama Terimi:', query);

  if (!query) {
    return (
      <div className={containerClass}>
        <div className="bg-orange-50 p-6 rounded-lg text-center border border-orange-100">
          <h2 className="text-lg text-orange-800">Lütfen bir arama terimi giriniz.</h2>
        </div>
      </div>
    );
  }

  let products: IProducts[] = [];

  try {
    products = await searchProducts(query);
  } catch (error) {
    console.error('API Hatası:', error);
    return (
      <div className={containerClass}>
        <div className="text-red-500">Bağlantı hatası.</div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="mb-6 border-b pb-4">
        <h1 className="text-xl text-gray-800">
          <span className="font-bold text-orange-600">"{query}"</span> araması için sonuçlar
        </h1>
        <p className="text-sm text-gray-500 mt-1">{products.length} ürün bulundu</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">Sonuç bulunamadı.</div>
      )}
    </div>
  );
};

export default SearchPage;
