import { Skeleton } from '../ui/skeleton';
import React from 'react'; 

const UserCardSkeleton = ({is}:{is?:boolean}) => {
  return (
    <article className='user-card'>
      <div className="user-card_avatar">
        <Skeleton className={`relative ${is&&" bg-[#ff971d]"} aspect-square h-[48px] w-[48px] rounded-full`} />
        <div className="flex-1 ml-4">
          <Skeleton className={`h-[20px] ${is&&" bg-[#ff971d]"} w-[80px] mb-2` }/>
          <Skeleton className={`h-[16px] ${is&&" bg-[#ff971d]"} w-[60px]`} />
        </div>
      </div>
      <Skeleton className={` ${is&&" bg-[#ff971d]"} h-[36px] w-[80px]` }/>
    </article>
  );
};

export default UserCardSkeleton;
