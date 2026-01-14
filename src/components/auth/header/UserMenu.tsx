'use client';

import { FC } from 'react';
import { User } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsPerson } from 'react-icons/bs';
import { LogOut } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { USER_MENU } from '@/constants';

interface Props {
  user: User;
}

const UserMenu: FC<Props> = ({ user }) => {
  const { logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center mt-1 text-sm gap-1 hover:text-primary-hover cursor-pointer transition-colors">
          <BsPerson className="size-5 " />
          <span className="font-semibold ">Hesabım</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {USER_MENU.map((item, i) => (
          <DropdownMenuItem asChild key={i}>
            <Link
              href={item.url || '#'}
              className="cursor-pointer flex items-center w-full focus:bg-orange-50 focus:text-orange-600"
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
