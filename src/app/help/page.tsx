import HelpCategory from '@/components/help/HelpCategory';
import HelpInput from '@/components/help/HelpInput';
import { FC } from 'react';

const HelpPage: FC = () => {
  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      {/* Search Section */}
      <HelpInput />

      {/* Categories Section */}
      <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <HelpCategory />
      </div>
    </main>
  );
};

export default HelpPage;
