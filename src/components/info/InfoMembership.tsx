'use client';

import { Button } from '@/components/ui/button';
import { InfoMembershipSchema } from '@/lib/schema';
import { auth, db } from '@/services/firebase';
import { IMemberShipFormValues } from '@/types/types';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { Loader2 } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const InfoMembership: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [initialValues, setInitialValues] = useState<IMemberShipFormValues>({
    id: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    birthDay: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Kullanıcı yoksa
      if (!user) {
        setLoading(false);
        return;
      }

      // Kullanıcı varsa veriyi çek
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          let formattedDate = '';

          // --- TARİH FORMAT---
          if (data.birthDay) {
            try {
              const dateObj = data.birthDay.toDate
                ? data.birthDay.toDate()
                : new Date(data.birthDay);
              const offset = dateObj.getTimezoneOffset();
              const localDate = new Date(dateObj.getTime() - offset * 60 * 1000);
              formattedDate = localDate.toISOString().split('T')[0];
            } catch (err) {
              console.warn('Tarih formatlanamadı:', err);
            }
          }

          setInitialValues({
            id: user.uid,
            fullName: data.fullName || '',
            email: user.email || '',
            phoneNumber: data.phoneNumber || '',
            birthDay: formattedDate,
          });
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        toast.error('Kullanıcı bilgileri alınamadı');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const formik = useFormik<IMemberShipFormValues>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: InfoMembershipSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!auth.currentUser) return;

      try {
        const docRef = doc(db, 'users', auth.currentUser.uid);

        const payload = {
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          birthDay: values.birthDay ? new Date(values.birthDay) : null,
        };

        await updateDoc(docRef, payload);
        toast.success('Bilgileriniz başarıyla güncellendi!');
      } catch (error) {
        console.error('Güncelleme hatası:', error);
        toast.error('Güncelleme sırasında bir hata oluştu');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const getInputClass = (hasError: boolean) =>
    `w-full border p-3 rounded-md outline-none transition-colors mt-1 ${
      hasError
        ? 'border-red-500 bg-red-50 focus:border-red-500'
        : 'border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
    }`;

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-orange-600 w-8 h-8" />
      </div>
    );
  }

  if (!auth.currentUser) {
    return <div className="p-6 text-center text-gray-500">Lütfen giriş yapınız.</div>;
  }

  return (
    <div className="bg-white w-full rounded-lg mt-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Üyelik Bilgilerim</h2>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 flex-1">
        {/* Ad Soyad */}
        <div>
          <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
            Ad Soyad
          </label>
          <input
            type="text"
            id="fullName"
            {...formik.getFieldProps('fullName')}
            className={getInputClass(!!(formik.touched.fullName && formik.errors.fullName))}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-500 text-xs mt-1 font-medium">{formik.errors.fullName}</div>
          )}
        </div>

        {/* E-posta  */}
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            E-Posta
          </label>
          <input
            type="email"
            id="email"
            value={formik.values.email}
            disabled
            className="w-full border p-3 rounded-md bg-gray-100 text-gray-500 mt-1 cursor-not-allowed border-gray-200"
          />
          <span className="text-xs text-gray-400 mt-1 block">
            E-posta adresi güvenlik nedeniyle değiştirilemez.
          </span>
        </div>

        {/* Telefon ve Doğum Tarihi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Telefon */}
          <div>
            <label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">
              Telefon Numarası
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="05xxxxxxxxx"
              {...formik.getFieldProps('phoneNumber')}
              className={getInputClass(!!(formik.touched.phoneNumber && formik.errors.phoneNumber))}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-500 text-xs mt-1 font-medium">
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>

          {/* Doğum Tarihi */}
          <div>
            <label htmlFor="birthDay" className="text-sm font-semibold text-gray-700">
              Doğum Tarihi
            </label>
            <input
              type="date"
              id="birthDay"
              {...formik.getFieldProps('birthDay')}
              className={getInputClass(!!(formik.touched.birthDay && formik.errors.birthDay))}
            />
            {formik.touched.birthDay && formik.errors.birthDay && (
              <div className="text-red-500 text-xs mt-1 font-medium">{formik.errors.birthDay}</div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 mt-auto">
          <Button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
            className="bg-orange-600 hover:bg-orange-700 text-white w-full py-6 font-bold text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Güncelleniyor...
              </div>
            ) : (
              'Bilgileri Güncelle'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InfoMembership;
