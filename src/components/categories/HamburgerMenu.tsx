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

const HamburgerMenu: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, logOut } = useAuth();
  const router = useRouter();

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const hierarchy = useMemo(() => {
    if (!categories || categories.length === 0) return { level0: [], level1: [], level2: [] };
    return {
      level0: categories.filter((c) => Number(c.level) === 0),
      level1: categories.filter((c) => Number(c.level) === 1),
      level2: categories.filter((c) => Number(c.level) === 2),
    };
  }, [categories]);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsOpen(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  if (isLoading)
    return (
      <Button variant="ghost" size="icon" className="-ml-2 hover:bg-transparent">
        <Menu className="h-6 w-6 text-foreground animate-pulse" />
      </Button>
    );

  if (error) return null;

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
          className="w-[85vw] max-w-[320px] p-0 flex flex-col h-full bg-white z-60"
        >
          {/* HEADER  */}
          <SheetHeader className="p-4 border-b flex flex-row items-center justify-between shrink-0 bg-white">
            <SheetTitle className="text-left text-xl font-bold text-primary">
              trendyol<span className="text-foreground">clone</span>
            </SheetTitle>
          </SheetHeader>

          {/* SCROLL  */}
          <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
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

            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Kategoriler
            </p>

            <Accordion type="single" collapsible className="w-full">
              {hierarchy.level0.map((parent) => (
                <AccordionItem
                  key={parent.id}
                  value={`item-${parent.id}`}
                  className="border-b-0 px-0"
                >
                  <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:text-primary hover:bg-gray-50 text-gray-800">
                    {parent.name}
                  </AccordionTrigger>

                  <AccordionContent className="pb-0">
                    <div className="bg-gray-50/50">
                      {hierarchy.level1
                        .filter((lvl1) => Number(lvl1.parentId) === Number(parent.id))
                        .map((subCategory) => (
                          <div
                            key={subCategory.id}
                            className="border-b border-gray-100 last:border-0"
                          >
                            <div className="px-6 py-2 text-xs font-bold text-gray-500 uppercase mt-2">
                              {subCategory.name}
                            </div>

                            <div className="flex flex-col">
                              {hierarchy.level2
                                .filter((lvl2) => Number(lvl2.parentId) === Number(subCategory.id))
                                .map((leafCategory) => (
                                  <SheetClose asChild key={leafCategory.id}>
                                    <Link
                                      href={`/category/${leafCategory.slug}`}
                                      className="flex items-center justify-between px-6 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-orange-50/50 transition-colors"
                                    >
                                      {leafCategory.name}
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

          {/* FOOTER */}
          <div className="border-t p-4 bg-gray-50 shrink-0">
            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <SheetClose asChild>
                  <Link
                    href="/login"
                    className="flex items-center justify-center h-10 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
                  >
                    Giriş Yap
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/register"
                    className="flex items-center justify-center h-10 rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Üye Ol
                  </Link>
                </SheetClose>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs text-gray-500">Hoşgeldin,</span>
                    <span className="text-sm font-semibold text-gray-900 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-gray-200 my-2" />

                <SheetClose asChild>
                  <Link
                    href="/account/info"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-white text-gray-700 font-medium transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Hesabım
                  </Link>
                </SheetClose>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full p-2 rounded-md text-red-600 hover:bg-red-50 font-medium transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamburgerMenu;
