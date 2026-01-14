import InfoMembership from '@/components/info/InfoMembership';
import InfoUpddatePassword from '@/components/info/InfoUpddatePassword';
import InfoUserAction from '@/components/info/InfoUserAction';
import { FC } from 'react';

const AccountInfo: FC = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header & Actions */}
      <div className="w-full bg-white p-5 shadow-sm border border-gray-100 rounded-xl flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Kullanıcı Bilgilerim</h2>
        <InfoUserAction />
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-xl">
          <InfoMembership />
        </div>

        {/* Şifre Güncelleme Kartı */}
        <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-xl">
          <InfoUpddatePassword />
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
