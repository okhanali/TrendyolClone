import { IProducts } from '@/types/types';
import dbData from '../../db.json';

// Tip güvenliği ekledik (any yerine IProduct)
export const getProducts = async (
  categoryId?: number | string,
  query?: string
): Promise<IProducts[]> => {
  // dbData.products yoksa boş dizi döndür
  let data: IProducts[] = (dbData.products as IProducts[]) || [];

  // Kategori Filtresi
  if (categoryId) {
    data = data.filter((p) => Number(p.categoryId) === Number(categoryId));
  }

  // Arama Filtresi
  if (query) {
    const lowerQuery = query.toLocaleLowerCase('tr');
    data = data.filter(
      (p) =>
        p.title.toLocaleLowerCase('tr').includes(lowerQuery) ||
        p.description?.toLocaleLowerCase('tr').includes(lowerQuery)
    );
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 100);
  });
};

export const getProductById = async (id: number | string): Promise<IProducts | undefined> => {
  const products: IProducts[] = (dbData.products as IProducts[]) || [];
  return new Promise((resolve) => {
    const product = products.find((p) => p.id.toString() === id.toString());
    setTimeout(() => resolve(product), 100);
  });
};
