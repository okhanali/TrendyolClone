import { ICategory, IProducts } from '@/types/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const config = {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      throw new Error(`API Error (${res.status})`);
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error(`Fetch failed for ${endpoint}:`, error);
    throw error;
  }
}

export const searchProducts = async (query: string): Promise<IProducts[]> => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();

  try {
    const [allProducts, allCategories] = await Promise.all([
      fetchAPI<IProducts[]>('/products', { cache: 'no-store' }),
      fetchAPI<ICategory[]>('/categories', { cache: 'no-store' }),
    ]);

    // Ürün İsmine veya Markaya Göre Eşleşenler
    const matchedByText = allProducts.filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(searchTerm);
      const brandMatch = product.brandName?.toLowerCase().includes(searchTerm);
      return titleMatch || brandMatch;
    });

    // Önce ismi eşleşen kategorileri bul
    // Sadece arama terimi 3 harften uzunsa kategori araması yap
    let matchedByCategory: IProducts[] = [];

    if (searchTerm.length >= 3) {
      const matchingCategories = allCategories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm)
      );

      // Bu kategorilere ait ID'leri topla
      const matchingCategoryIds = matchingCategories.map((cat) => cat.id);

      // Bu kategori ID'sine sahip ürünleri bul
      matchedByCategory = allProducts.filter((product) =>
        matchingCategoryIds.some((id) => String(id) === String(product.categoryId))
      );
    }

    //Sonuçları Birleştir ve Tekilleştir
    const combinedResults = [...matchedByText, ...matchedByCategory];

    const uniqueResults = combinedResults.filter(
      (product, index, self) => index === self.findIndex((p) => p.id === product.id)
    );

    return uniqueResults;
  } catch (error) {
    console.error('Search Error:', error);
    return [];
  }
};
