'use client';

import { InfoUpdatePasswordSchema } from '@/lib/schema';
import { auth } from '@/services/firebase';
import { IUpdatePasswordValues } from '@/types/types';
import { FirebaseError } from 'firebase/app';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

const PasswordInput = ({
  label,
  name,
  formik,
}: {
  label: string;
  name: keyof IUpdatePasswordValues;
  formik: any;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          className={`w-full border p-3 rounded-md outline-none pr-10 transition-colors mt-1 ${
            formik.touched[name] && formik.errors[name]
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 focus:border-orange-500'
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          tabIndex={-1}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-500 text-xs mt-1">{formik.errors[name]}</div>
      )}
    </div>
  );
};

const InfoUpdatePassword: FC = () => {
  const formik = useFormik<IUpdatePasswordValues>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: InfoUpdatePasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const user = auth.currentUser;
      if (!user || !user.email) {
        toast.error('Oturum bilgisi bulunamadı');
        setSubmitting(false);
        return;
      }

      try {
        const credential = EmailAuthProvider.credential(user.email, values.currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, values.newPassword);
        toast.success('Şifreniz başarıyla güncellendi!');
        resetForm();
      } catch (error) {
        console.error('Password Update Error:', error);
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
            toast.error('Mevcut şifrenizi yanlış girdiniz.');
          } else if (error.code === 'auth/requires-recent-login') {
            toast.error('Güvenlik nedeniyle tekrar giriş yapmalısınız.');
          } else {
            toast.error(`Hata: ${error.message}`);
          }
        } else {
          toast.error('Beklenmedik bir hata oluştu.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white w-full rounded-lg mt-6 h-full">
      {' '}
      <h2 className="text-xl font-bold mb-6 text-gray-800">Şifre Güncelleme</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <PasswordInput label="Mevcut Şifre" name="currentPassword" formik={formik} />
        <PasswordInput label="Yeni Şifre" name="newPassword" formik={formik} />
        <PasswordInput label="Yeni Şifre Tekrar" name="confirmPassword" formik={formik} />

        <div className="pt-2 mt-auto">
          {' '}
          <Button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
            className="bg-orange-600 hover:bg-orange-700 text-white w-full py-6 font-bold text-lg transition-all disabled:opacity-50"
          >
            {formik.isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Güncelleniyor...
              </div>
            ) : (
              'Şifreyi Güncelle'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InfoUpdatePassword;
