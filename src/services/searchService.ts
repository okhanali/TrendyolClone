import { ICategory, IProducts } from '@/types/types';
import dbData from '../../db.json';

export const searchProducts = async (query: string): Promise<IProducts[]> => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();

  const allProducts = (dbData.products as unknown as IProducts[]) || [];
  const allCategories = (dbData.categories as unknown as ICategory[]) || [];

  return new Promise((resolve) => {
    // Ürün İsmine veya Markaya Göre Eşleşenler
    const matchedByText = allProducts.filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(searchTerm);
      const brandMatch = product.brandName?.toLowerCase().includes(searchTerm);
      return titleMatch || brandMatch;
    });

    // Kategoriye Göre Eşleşenler
    let matchedByCategory: IProducts[] = [];

    if (searchTerm.length >= 3) {
      const matchingCategories = allCategories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm)
      );

      const matchingCategoryIds = matchingCategories.map((cat) => cat.id);

      matchedByCategory = allProducts.filter((product) =>
        matchingCategoryIds.some((id) => String(id) === String(product.categoryId))
      );
    }

    // Sonuçları Birleştir ve Tekilleştir
    const combinedResults = [...matchedByText, ...matchedByCategory];

    const uniqueResults = combinedResults.filter(
      (product, index, self) => index === self.findIndex((p) => p.id === product.id)
    );

    setTimeout(() => resolve(uniqueResults), 100);
  });
};
