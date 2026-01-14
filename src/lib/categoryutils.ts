import { ICategory } from '@/types/types';

export const getCategoryTreeIds = (
  rootId: string | number,
  allCategories: ICategory[]
): number[] => {
  const resultIds: number[] = [Number(rootId)];

  const children = allCategories.filter((c) => Number(c.parentId) === Number(rootId));

  children.forEach((child) => {
    const childIds = getCategoryTreeIds(child.id, allCategories);
    resultIds.push(...childIds);
  });

  return resultIds;
};
