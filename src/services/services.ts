import { ICategory, IProducts } from '@/types/types';
import dbData from '../../db.json';

export const getCategories = async (): Promise<ICategory[]> => {
  const categories = (dbData.categories as unknown as ICategory[]) || [];

  return Promise.resolve(categories);
};

export const getProducts = async (): Promise<IProducts[]> => {
  const products = (dbData.products as unknown as IProducts[]) || [];
  return Promise.resolve(products);
};

export const getProductDetail = async (id: string | number): Promise<IProducts | null> => {
  const products = (dbData.products as unknown as IProducts[]) || [];
  const product = products.find((p) => p.id.toString() === id.toString());
  return Promise.resolve(product || null);
};

export const getUserFavoriteProducts = async (userId: string): Promise<IProducts[]> => {
  return Promise.resolve([]);
};
