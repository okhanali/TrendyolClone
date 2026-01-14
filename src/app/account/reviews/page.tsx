import ReviewFilterTabs from '@/components/account/components/reviews/ReviewFilterTabs';
import ReviewTracking from '@/components/account/components/reviews/ReviewTracking';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';

export const dynamic = 'force-dynamic';

const ReviewsPage: FC = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get('firebase-uid')?.value;

  if (!userId) {
    redirect('/login?returnUrl=/account/reviews');
  }

  return (
    <div className="flex flex-col gap-4 items-start justify-between bg-white w-full p-5 shadow border rounded-md">
      <div className="flex w-full">
        <h2 className="text-lg text-primary font-semibold">Ürün Değerlendirmelerim</h2>
      </div>
      <hr className="w-full border-gray-100" />

      <ReviewFilterTabs userId={userId} />

      <div className="p-5 w-full">
        <ReviewTracking userId={userId} />
      </div>
    </div>
  );
};

export default ReviewsPage;
