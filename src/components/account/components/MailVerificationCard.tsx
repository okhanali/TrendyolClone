'use client';

import { useAuth } from '@/hooks/useAuth';
import { FC, useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const MailVerificationCard: FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleVerify = async () => {
    setLoading(true);

    setTimeout(() => setLoading(false), 2000);
    alert('Doğrulama maili gönderildi!');
  };

  return (
    <div className="border border-gray-200 bg-white shadow-sm rounded-lg p-5 flex items-start gap-4">
      {/* Profil Resmi */}
      <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold shrink-0">
        {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <p className="text-sm font-bold text-gray-900 truncate">
          {user.displayName || 'Kullanıcı'}
        </p>
        <span className="text-xs text-gray-500 truncate mb-2">{user.email}</span>

        {/* Rozet */}
        {user.emailVerified ? (
          <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
            <CheckCircle2 size={14} />
            <span>Onaylı Hesap</span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
              <AlertCircle size={14} />
              <span>E-posta doğrulanmadı</span>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading}
              className="text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 py-1.5 px-3 rounded-full transition-colors w-fit flex items-center gap-2 disabled:opacity-70"
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? 'Gönderiliyor...' : 'Şimdi Doğrula'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailVerificationCard;
