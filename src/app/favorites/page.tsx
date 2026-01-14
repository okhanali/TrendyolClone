import FavoriteProductsClient from '@/components/favorite/FavoriteProductsClient';
import { getUserFavoriteProducts } from '@/services/userService';
import { cookies } from 'next/headers';
import { FC } from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Favorilerim | Trendyol Clone',
  description: 'Beğendiğiniz ürünleri takip edin.',
  robots: {
    index: false,
    follow: false,
  },
};

const FavoritesPage: FC = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get('firebase-uid')?.value;

  if (!userId) {
    redirect('/login?callbackUrl=/favorites');
  }

  const data = await getUserFavoriteProducts(userId);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Favorilerim</h1>
          <span className="text-sm text-gray-500 font-medium">{data.length} Ürün</span>
        </div>
        <FavoriteProductsClient initialProducts={data} />
      </div>
    </main>
  );
};

export default FavoritesPage;
