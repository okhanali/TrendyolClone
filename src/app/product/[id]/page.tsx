import ProductDetailDesc from '@/components/productdetail/ProductDetailDesc';
import ProductDetailFeatures from '@/components/productdetail/ProductDetailFeatures';
import InformationSlider from '@/components/ui/InformationSlider';
import { HIGHLIGHTS_DATA } from '@/constants';
import { getProducts } from '@/services/services';
import { Camera, Star } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductBuyingSection from '@/components/productdetail/ProductBuyingSection';
import { FC } from 'react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const productIdFromUrl = id.split('-')[0];
  const data = await getProducts();
  const product = data.find((item) => item.id.toString() === productIdFromUrl);

  if (!product) return { title: 'Ürün Bulunamadı' };

  return {
    title: `${product.brandName} ${product.title} | Trendyol Clone`,
    description: product.description,
    openGraph: {
      images: [product.images?.[0] || ''],
    },
  };
}

const ProductDetail: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const productIdFromUrl = id.split('-')[0];
  const data = await getProducts();
  const product = data.find((item) => item.id.toString() === productIdFromUrl);

  if (!product) return notFound();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 mb-12">
      <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-12 items-start relative">
        {/* --- SOL TARAF (Görsel) --- */}
        <div className="w-full lg:w-125 xl:w-150 shrink-0 relative lg:sticky lg:top-24 z-10">
          <div className="border border-gray-100 rounded-xl p-2 bg-white shadow-sm overflow-hidden">
            <div className="relative aspect-3/4 w-full">
              <Image
                src={product?.images?.[0] || ''}
                alt={product?.title || 'Ürün görseli'}
                fill
                priority
                quality={85}
                className="rounded-lg object-contain transform hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>

        {/* --- SAĞ TARAF  --- */}
        <div className="flex flex-col gap-4 flex-1 min-w-0 w-full">
          {/* Başlık ve Rating */}
          <div className="space-y-3">
            <h1 className="text-lg sm:text-xl md:text-2xl text-gray-900 leading-snug wrap-break-word">
              <span className="font-bold block sm:inline mr-1">{product?.brandName}</span>
              <span className="font-normal text-gray-700">{product?.description}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-900 font-bold text-sm">{product?.rating}</span>
                <div className="flex text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      className={
                        i < Math.floor(product.rating) ? 'text-orange-500' : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
              </div>
              <span className="text-gray-500 text-xs hover:underline cursor-pointer border-l pl-3 border-gray-300">
                {product?.reviewCount} Değerlendirme
              </span>
              <div className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-orange-500 transition-colors border-l pl-3 border-gray-300">
                <Camera size={16} />
                <span className="text-xs hidden sm:inline">Fotoğraflı Yorumlar</span>
                <span className="text-xs sm:hidden">Fotoğraflar</span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {/* Slider & Fiyat */}
            <div className="w-full max-w-md">
              {' '}
              <InformationSlider
                items={HIGHLIGHTS_DATA.map((h) => ({
                  id: `hl-${product.id}-${h.id}`,
                  text: h.text,
                  icon: <h.icon className="w-4 h-4" />,
                }))}
                textColor="text-gray-600"
              />
            </div>

            <div className="mt-2">
              <span className="text-primary font-bold text-2xl sm:text-3xl tracking-tight">
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                  product.price
                )}
              </span>
            </div>

            <hr className="border-gray-200" />

            {/* --- SATIN ALMA BÖLÜMÜ --- */}
            <ProductBuyingSection product={product} />

            <div className="mt-4">
              <ProductDetailFeatures features={product?.features || []} />
            </div>

            <div className="mt-2">
              <ProductDetailDesc description={product.extraDetails || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
