import { Skeleton } from '../ui/skeleton';
import React from 'react'; 

const UserCardSkeleton = () => {
  return (
    <article className='user-card'>
      <div className="user-card_avatar">
        <Skeleton className="relative aspect-square h-[48px] w-[48px] rounded-full" />
        <div className="flex-1 ml-4">
          <Skeleton className="h-[20px] w-[80px] mb-2" />
          <Skeleton className="h-[16px] w-[60px]" />
        </div>
      </div>
      <Skeleton className="user-card_btn h-[36px] w-[80px]" />
    </article>
  );
};

export default UserCardSkeleton;
