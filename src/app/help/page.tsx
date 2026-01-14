import HelpCategory from '@/components/help/HelpCategory';
import HelpInput from '@/components/help/HelpInput';
import { FC } from 'react';

const HelpPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 ">
      <HelpInput />
      <HelpCategory />
    </div>
  );
};

export default HelpPage;
