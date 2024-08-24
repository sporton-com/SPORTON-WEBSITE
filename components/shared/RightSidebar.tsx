"use client";
import { useInfiniteQuery } from '@tanstack/react-query';
import { UserData, fetchAllUser } from '@/lib/actions/user.actions';
import { SugCard } from '../cards/sugCard';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import UserCardSkeleton from "../cards/UserCardSkeleton";

const useFetchUsers = () => {
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllUser({
        searchString:"",
        pageNum: pageParam,
        pageSize: 15,
      }),
    getNextPageParam: (lastPage) => {
      console.log(lastPage); // Debugging statement
      return lastPage.isNext ? lastPage.pageNum + 1 : undefined;
    },
    initialPageParam: 1, // Start from the first page
  });
};
interface Props {
  isChat?: boolean;
  Ids?: string;
  isxl?: boolean;
  islg?: boolean;
  setChat?: any;
  userInfo: UserData | { redirect: string };
}

const RightSidebar = ({ isChat, userInfo, Ids, isxl, islg, setChat }: Props) => {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchUsers();

  useEffect(() => {
    if (!hasNextPage) return; // Stop observing if there's no more pages

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 1.0, // Trigger when 100% of the element is visible
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if ('redirect' in userInfo!) {
    router.replace(userInfo.redirect);
    return null; // Ensure no content is returned during redirection
  }


  const users = data?.pages.flatMap((page) => page.users) || [];

  return (
    <section
      className={`rightsidebar custom-scrollbar ${
        isxl ? "w-full" : "max-xl:hidden"
      } ${isChat ? ` p-0 ${!Ids && " px-1"} w-96` : "p-3 pt-28 w-72"}`}>
      <div className="flex flex-1 flex-col justify-start">
        {!isChat && (
          <h1 className="text-body-bold head-text text-[25px] text-white mb-6">Player</h1>
        )}
        {users.length > 0 && userInfo && (
          <SugCard
            result2={JSON.stringify(users)}
            userInfo2={JSON.stringify(userInfo as UserData)}
            type={"users"}
            isChat={isChat}
            Ids={Ids || ""}
            islg={islg}
            refrish={fetchNextPage} // Trigger next page fetch on refresh
            setChat={setChat}
          />
        )}
        
      {isFetchingNextPage && 
      
      <div  className="mt-4">
      <UserCardSkeleton is/>
          </div>
      }
      <div ref={loadMoreRef} className="mt-4">
          </div>
           {/* This div triggers the next page load */}
      </div>
    </section>
  );
};

export default RightSidebar;
