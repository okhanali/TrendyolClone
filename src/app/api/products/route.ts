import { NextResponse } from 'next/server';

import dbData from '../../../../db.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');
  const search = searchParams.get('q');

  let products = dbData.products || [];

  // Kategori Filtresi
  if (categoryId) {
    products = products.filter((p: any) => p.categoryId == categoryId);
  }

  // Arama Filtresi
  if (search) {
    const searchLower = search.toLowerCase();
    products = products.filter(
      (p: any) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
    );
  }

  return NextResponse.json(products);
}
