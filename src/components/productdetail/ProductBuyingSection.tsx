'use client';

import { FC, useState, useMemo, useEffect } from 'react';
import { IProducts, IVariant } from '@/types/types';
import ProductDetailVariants from './ProductDetailVariants';
import ProductDetailButtons from './ProductDetailButtons';

interface Props {
  product: IProducts;
}

const ProductBuyingSection: FC<Props> = ({ product }) => {
  const uniqColors = useMemo(() => {
    const allColor = product.variants.map((variant) => variant.color);
    return Array.from(new Set(allColor));
  }, [product.variants]);

  const [selectedColor, setSelectedColor] = useState<string>(uniqColors[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const availableSizes = useMemo(() => {
    return product.variants.filter((v) => v.color === selectedColor);
  }, [product.variants, selectedColor]);

  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  const currentSelectedVariant = useMemo(() => {
    return product.variants.find((v) => v.color === selectedColor && v.size === selectedSize);
  }, [product.variants, selectedColor, selectedSize]);

  return (
    <div className="flex flex-col gap-6">
      <ProductDetailVariants
        uniqColors={uniqColors}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        availableSizes={availableSizes}
        onColorChange={setSelectedColor}
        onSizeChange={setSelectedSize}
      />

      <ProductDetailButtons product={product} selectedVariant={currentSelectedVariant || null} />
    </div>
  );
};

export default ProductBuyingSection;
