import { ICategory, IProducts } from '@/types/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error('🚨 CRITICAL: NEXT_PUBLIC_API_URL environment variable is not defined!');
}

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const res = await fetch(url, config);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      throw new Error(
        `API Error (${res.status}): ${errorBody?.message || res.statusText} at ${endpoint}`
      );
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`Fetch failed for ${endpoint}:`, error);
    throw error;
  }
}

export const getCategories = async (): Promise<ICategory[]> => {
  return fetchAPI<ICategory[]>('/categories', {
    cache: 'no-store',
  });
};

export const getProducts = async (): Promise<IProducts[]> => {
  return fetchAPI<IProducts[]>('/products', {
    next: { revalidate: 60 },
  });
};

export const getProductDetail = async (id: string | number): Promise<IProducts | null> => {
  try {
    return await fetchAPI<IProducts>(`/products/${id}`, {
      cache: 'no-store',
    });
  } catch (error: any) {
    console.error(`Product ${id} not found or error occurred.`);
    return null;
  }
};
