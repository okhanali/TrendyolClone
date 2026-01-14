'use client';
import { FC, useState } from 'react';
import { useFormik } from 'formik';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc'; // Google ikonu
import { ILoginValues } from '@/types/types';
import { Button } from '@/components/ui/button';
import { loginSchema } from '@/lib/schema';
import { toast } from 'react-toastify';
import AuthInput from '../auth/AuthInput';
import { auth, googleProvider } from '@/services/firebase';

const LoginForm: FC = () => {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const formik = useFormik<ILoginValues>({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setGlobalError(null);
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast.success('Başarıyla Giriş Yapıldı');
        router.push('/');
        router.refresh();
      } catch (error: any) {
        console.error('Login Error:', error.code);
        switch (error.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setGlobalError('E-posta adresi veya şifre hatalı');
            break;
          case 'auth/too-many-requests':
            setGlobalError('Çok fazla deneme yaptınız. Lütfen bekleyiniz');
            break;
          default:
            setGlobalError('Giriş yapılırken bir sorun oluştu');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Google ile Giriş Fonksiyonu
  const handleGoogleLogin = async () => {
    setGlobalError(null);
    setIsGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Trendyol Clone' Hoşgeldiniz!");
      router.push('/');
      router.refresh();
    } catch (error: any) {
      console.error('Google Auth Error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        return;
      }
      setGlobalError('Google ile giriş yapılırken bir hata oluştu.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mt-6">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {globalError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md animate-in fade-in">
            {globalError}
          </div>
        )}

        <AuthInput
          id="email"
          label="E-Posta"
          type="email"
          placeholder="E-posta adresiniz"
          formik={formik}
        />

        <AuthInput
          id="password"
          label="Şifre"
          type="password"
          placeholder="******"
          formik={formik}
        />

        <Button
          type="submit"
          disabled={formik.isSubmitting || isGoogleLoading}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 mt-2 transition-all"
        >
          {formik.isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Giriş Yapılıyor...
            </div>
          ) : (
            'Giriş Yap'
          )}
        </Button>
      </form>

      {/* Ayırıcı Çizgi */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Veya</span>
        </div>
      </div>

      {/* Google Butonu */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || formik.isSubmitting}
        className="w-full py-6 font-medium text-gray-700 border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-3"
      >
        {isGoogleLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
        ) : (
          <FcGoogle className="h-6 w-6" />
        )}
        Google ile Giriş Yap
      </Button>
    </div>
  );
};

export default LoginForm;
