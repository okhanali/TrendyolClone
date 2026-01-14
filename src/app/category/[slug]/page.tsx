import Products from '@/components/product/Products';
import { getCategoryTreeIds } from '@/lib/categoryutils';
import { getCategories, getProducts } from '@/services/services';

import { IProducts } from '@/types/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const SPECIAL_CATEGORIES: Record<string, string> = {
  'flas-urunler': 'Flaş Ürünler',
  'cok-satanlar': 'Çok Satanlar',
};

const ProductsPage: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const normalizedSlug = slug.trim().toLowerCase();
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const dbCategory = categories.find((c) => {
    return c.slug?.trim().toLowerCase() === normalizedSlug;
  });
  const isSpecialCategory = Object.keys(SPECIAL_CATEGORIES).includes(normalizedSlug);

  if (!dbCategory && !isSpecialCategory) {
    notFound();
  }

  const currentCategory =
    dbCategory ||
    ({
      id: 99999,
      name: SPECIAL_CATEGORIES[slug],
      slug: slug,
    } as any);

  let filteredProducts: IProducts[] = [];

  if (slug === 'flas-urunler') {
    filteredProducts = products.filter(
      (p) =>
        p.badges?.includes('Flaş Ürün') ||
        (p.discountPrice !== null && p.discountPrice !== undefined && p.discountPrice < p.price)
    );
  } else if (slug === 'cok-satanlar') {
    filteredProducts = products.filter(
      (p) => p.badges?.includes('Çok Satan') || p.reviewCount > 1000
    );
  } else {
    if (currentCategory.id === 99999) {
      filteredProducts = [];
    } else {
      const targetCategoryIds = getCategoryTreeIds(currentCategory.id, categories);

      filteredProducts = products.filter((product) =>
        targetCategoryIds.includes(Number(product.categoryId))
      );
    }
  }

  return (
    <div className="container mx-auto px-4 mt-6 mb-12">
      <div className="flex items-center gap-2 justify-start text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          <h1>Trendyol</h1>
        </Link>
        <MdOutlineKeyboardArrowRight className="size-4 text-primary" />
        <span className="font-semibold text-gray-900 capitalize">{currentCategory.name}</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end border-b border-gray-100 pb-2">
          <h1 className="text-2xl font-bold text-gray-800">{currentCategory.name}</h1>
          <span className="text-sm text-gray-500">{filteredProducts.length} ürün listelendi</span>
        </div>

        <Products productList={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
