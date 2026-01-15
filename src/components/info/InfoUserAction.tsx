'use client';

import { auth, db } from '@/services/firebase';
import { deleteUser, signOut } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { Activity, Globe, Trash2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';

const InfoUserAction: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // Hesap Silme
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const confirmDelete = window.confirm(
      'Hesabınız kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve tüm verileriniz silinir.'
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteDoc(doc(db, 'users', user.uid));

      await deleteUser(user);

      toast.success('Hesabınız başarıyla silindi. Üzüldük...');
      router.push('/');
    } catch (error: any) {
      console.error('Hesap silme hatası:', error);

      // Yapılan giriş üzerinden uzun zaman geçtiyse tekrar giriş iste
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Güvenlik gereği hesabınızı silmek için tekrar giriş yapmalısınız.');
        await signOut(auth);
        router.push('/login');
      } else {
        toast.error('Hesap silinirken bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureNotReady = (featureName: string) => {
    toast.info(`${featureName} özelliği yakında eklenecek`);
  };
  return (
    <div className="flex items-center gap-2">
      {/* Kullanıcı Bilgilerim */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-md border border-orange-200 transition-colors"
        title="Kullanıcı Bilgilerim"
      >
        <User size={16} />
        <span className="max-md:hidden">Bilgilerim</span>
      </button>

      {/* Başarılı/Başarısız Girişler */}
      <button
        onClick={() => handleFeatureNotReady('Giriş Hareketleri')}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
        title="Giriş Hareketleri"
      >
        <Activity size={16} />
        <span className="max-md:hidden">Giriş Hareketleri</span>
      </button>

      {/* Ülke Değiştir */}
      <button
        onClick={() => handleFeatureNotReady('Ülke Değiştirme')}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
        title="Ülke Değiştir"
      >
        <Globe size={16} />
        <span className="max-md:hidden">Ülke Değiştir</span>
      </button>

      {/* Hesabı Kapat */}
      <button
        onClick={handleDeleteAccount}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-all ml-2"
        title="Hesabı Kapat"
      >
        <Trash2 size={16} />
        <span className="max-md:hidden">{loading ? 'Siliniyor...' : 'Hesabı Kapat'}</span>
      </button>
    </div>
  );
};

export default InfoUserAction;
