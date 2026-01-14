'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import RegisterForm from '../form/RegisterForm';
import LoginForm from '../form/LoginForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  defaultTab: 'login' | 'register';
}

const AuthContainer: FC<Props> = ({ defaultTab }) => {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    if (value === 'login') {
      router.push('/login');
    } else {
      router.push('/register');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-50 min-h-[calc(100vh-150px)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Merhaba,</h2>
        <p className="text-secondary-foreground mt-2">
          TrendyolClone’a giriş yap veya hesap oluştur, indirimleri kaçırma!
        </p>
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-sm border">
        <Tabs
          defaultValue={defaultTab}
          value={defaultTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
            <TabsTrigger value="login" className="tabsTrigger">
              Giriş Yap
            </TabsTrigger>
            <TabsTrigger value="register" className="tabsTrigger">
              Üye Ol
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthContainer;
