import AdvertItem from '@/components/home/advertitem/AdvertItem';
import BestSellingProducts from '@/components/home/bestselling/BestSellingProducts';
import DescPage from '@/components/home/desc/DescPage';
import DiscountCategory from '@/components/home/discountcategory/DiscountCategory';
import FlashProducts from '@/components/home/flashproducts/FlashProducts';
import YouInterestedHead from '@/components/home/homelasthead/YouInterestedHead';
import SpecialsProduct from '@/components/home/specialproducts/SpecialsProduct';
import Widget from '@/components/home/widgets/Widget';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <main className="container mx-auto px-4 md:px-6 lg:px-8 mt-6 flex flex-col gap-8 mb-10">
      <Widget />

      <SpecialsProduct />

      <FlashProducts />

      <DiscountCategory />

      <AdvertItem />

      <BestSellingProducts />

      <YouInterestedHead />

      <DescPage />
    </main>
  );
};

export default Home;
