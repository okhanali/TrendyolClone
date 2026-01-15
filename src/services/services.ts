import { ICategory, IProducts } from '@/types/types';
import dbData from '../../db.json';

export const getCategories = async (): Promise<ICategory[]> => {
  const categories = (dbData.categories as unknown as ICategory[]) || [];
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 100);
  });
};

export const getProducts = async (): Promise<IProducts[]> => {
  const products = (dbData.products as unknown as IProducts[]) || [];
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 100);
  });
};

export const getProductDetail = async (id: string | number): Promise<IProducts | null> => {
  const products = (dbData.products as unknown as IProducts[]) || [];
  const product = products.find((p) => p.id.toString() === id.toString());

  return new Promise((resolve) => {
    setTimeout(() => resolve(product || null), 100);
  });
};

export const getUserFavoriteProducts = async (userId: string): Promise<IProducts[]> => {
  return [];
};
