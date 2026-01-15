'use client';

import { getCategories } from '@/services/services';
import { useQuery } from '@tanstack/react-query';
import { FC, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Menu, LogOut, User, ChevronRight, ShoppingBag, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

interface CategoryTreeItem {
  id: string | number;
  name: string;
  slug: string;
  subCategories: {
    id: string | number;
    name: string;
    leafs: any[];
  }[];
}

const HamburgerMenu: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, logOut } = useAuth();
  const router = useRouter();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const categoryTree = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    const level0 = categories.filter((c) => Number(c.level) === 0);
    const level1 = categories.filter((c) => Number(c.level) === 1);
    const level2 = categories.filter((c) => Number(c.level) === 2);

    return level0.map((parent) => ({
      ...parent,
      subCategories: level1
        .filter((l1) => Number(l1.parentId) === Number(parent.id))
        .map((sub) => ({
          ...sub,
          leafs: level2.filter((l2) => Number(l2.parentId) === Number(sub.id)),
        })),
    })) as CategoryTreeItem[];
  }, [categories]);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsOpen(false);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading)
    return (
      <Button variant="ghost" size="icon" className="-ml-2">
        <Menu className="h-6 w-6 animate-pulse" />
      </Button>
    );

  return (
    <div className="flex items-center justify-center">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="-ml-2 hover:bg-transparent">
            <Menu className="h-6 w-6 text-foreground" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[85vw] max-w-[320px] p-0 flex flex-col h-full bg-white z-[60]"
        >
          <SheetHeader className="p-4 border-b shrink-0 bg-white">
            <SheetTitle className="text-left text-xl font-bold text-primary">
              trendyol<span className="text-foreground">clone</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-2 scroll-smooth">
            {/* Üst Menü Linkleri */}
            <div className="px-4 pb-4 border-b mb-2 space-y-1">
              <SheetClose asChild>
                <Link
                  href="/cart"
                  className="flex items-center gap-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  <ShoppingBag className="w-5 h-5" /> Sepetim
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/favorites"
                  className="flex items-center gap-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  <Heart className="w-5 h-5" /> Favorilerim
                </Link>
              </SheetClose>
            </div>

            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Kategoriler</p>

            <Accordion type="single" collapsible className="w-full">
              {categoryTree.map((parent) => (
                <AccordionItem key={parent.id} value={`item-${parent.id}`} className="border-b-0">
                  <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:bg-gray-50">
                    {parent.name}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="bg-gray-50/50">
                      {parent.subCategories.map((sub) => (
                        <div key={sub.id} className="border-b border-gray-100 last:border-0">
                          <div className="px-6 py-2 text-[10px] font-bold text-gray-400 uppercase mt-1">
                            {sub.name}
                          </div>
                          <div className="flex flex-col">
                            {sub.leafs.map((leaf) => (
                              <SheetClose asChild key={leaf.id}>
                                <Link
                                  href={`/category/${leaf.slug}`}
                                  className="flex items-center justify-between px-6 py-2 text-sm text-gray-600 hover:text-primary hover:bg-orange-50 transition-colors"
                                >
                                  {leaf.name}
                                  <ChevronRight className="w-3 h-3 text-gray-300" />
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="border-t p-4 bg-gray-50 shrink-0"></div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamburgerMenu;
