'use client';

import { FC, useState } from 'react';
import { useFormik } from 'formik';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  deleteUser,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { auth, db } from '@/services/firebase';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import { IRegisterValues, IUsers } from '@/types/types';
import { Button } from '@/components/ui/button';
import { registerSchema } from '@/lib/schema';
import AuthInput from '../auth/AuthInput';

const RegisterForm: FC = () => {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const formik = useFormik<IRegisterValues>({
    initialValues: { fullName: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setGlobalError(null);
      let createdUser = null;

      try {
        // Kullanıcıyı oluştur
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        createdUser = userCredential.user;

        // Profil ismini güncelle
        await updateProfile(createdUser, { displayName: values.fullName });

        // Firestore verisini hazırla
        const userData: IUsers = {
          id: createdUser.uid,
          email: values.email,
          fullName: values.fullName,
          role: 'user',
          favorites: [],
          addresses: [],
        };

        // Firestore Kayıt ve Mail Gönderimi
        await Promise.all([
          setDoc(doc(db, 'users', createdUser.uid), userData),
          sendEmailVerification(createdUser),
        ]);

        toast.success('Kayıt başarılı! Lütfen e-posta adresinizi doğrulayınız');
        router.push('/login');
      } catch (error) {
        console.error('Register Error:', error);

        if (createdUser) {
          try {
            await deleteUser(createdUser);
          } catch (e) {
            console.error('Rollback failed', e);
          }
        }

        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              setGlobalError('Bu e-posta adresi zaten kullanımda.');
              break;
            case 'auth/weak-password':
              setGlobalError('Şifre çok zayıf, en az 6 karakter olmalı.');
              break;
            case 'auth/invalid-email':
              setGlobalError('Geçersiz bir e-posta adresi girdiniz.');
              break;
            default:
              setGlobalError(`Bir hata oluştu: ${error.message}`);
          }
        } else {
          setGlobalError('Beklenmedik bir hata oluştu.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-md mt-6">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {globalError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md flex items-center gap-2">
            <span>⚠️</span> {globalError}
          </div>
        )}

        <AuthInput
          id="fullName"
          label="Ad Soyad"
          placeholder="Adınız ve Soyadınız"
          formik={formik}
        />

        <AuthInput
          id="email"
          label="E-Posta"
          type="email"
          placeholder="ornek@email.com"
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
          disabled={formik.isSubmitting}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 mt-2 w-full transition-all"
        >
          {formik.isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Kayıt Olunuyor...
            </div>
          ) : (
            'Üye Ol'
          )}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
