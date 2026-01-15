import { ICategory, IProducts } from '@/types/types';
import dbData from '../../db.json';

export const searchProducts = async (query: string): Promise<IProducts[]> => {
  if (!query || query.trim().length === 0) return [];

  const searchTerm = query.toLowerCase().trim();
  const allProducts = (dbData.products as unknown as IProducts[]) || [];
  const allCategories = (dbData.categories as unknown as ICategory[]) || [];

  // 1. Metin bazlı eşleşme (Başlık veya Marka)
  const matchedByText = allProducts.filter((product) => {
    return (
      product.title?.toLowerCase().includes(searchTerm) ||
      product.brandName?.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm)
    );
  });

  // 2. Kategori bazlı eşleşme
  let matchedByCategory: IProducts[] = [];
  if (searchTerm.length >= 3) {
    const matchingCategoryIds = allCategories
      .filter((cat) => cat.name.toLowerCase().includes(searchTerm))
      .map((cat) => cat.id);

    matchedByCategory = allProducts.filter((product) =>
      matchingCategoryIds.some((id) => String(id) === String(product.categoryId))
    );
  }

  // 3. Sonuçları birleştir ve Tekilleştir (ID bazlı)
  const combinedResults = [...matchedByText, ...matchedByCategory];
  const uniqueResults = Array.from(new Map(combinedResults.map((p) => [p.id, p])).values());

  return uniqueResults;
};
