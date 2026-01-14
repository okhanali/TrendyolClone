import { getProductDetail, getProducts } from '@/services/services';
import { IProducts } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
  return useQuery<IProducts[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductDetail = (id: string | number) => {
  return useQuery<IProducts | null, Error>({
    queryKey: ['product', id],
    queryFn: () => getProductDetail(id),
    enabled: !!id,
  });
};
