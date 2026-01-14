import { IProducts } from '@/types/types';
import { favoriteService } from './favoriteService';
import { getProductDetail } from './services';

export const getUserFavoriteProducts = async (userId: string): Promise<IProducts[]> => {
  try {
    const favoriteIds = await favoriteService.getUserFavoritesIds(userId);

    if (favoriteIds.length === 0) {
      return [];
    }

    const productPromises = favoriteIds.map((id) => getProductDetail(id));

    const productsResponse = await Promise.all(productPromises);

    const activeProducts = productsResponse.filter(
      (product): product is IProducts => product !== null
    );

    return activeProducts;
  } catch (error) {
    console.error('Favori ürünler getirilirken hata oluştu', error);

    return [];
  }
};
