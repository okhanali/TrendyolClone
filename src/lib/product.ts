import { IVariant } from '@/types/types';

export const groupVariantsByColor = (variants: IVariant[]) => {
  const groups: Record<string, IVariant[]> = {};

  variants.forEach((v) => {
    if (!groups[v.color]) {
      groups[v.color] = [];
    }
    groups[v.color].push(v);
  });

  return groups;
};
