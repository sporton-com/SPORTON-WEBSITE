"use client";
import Home from "@/components/shared/MainHome";
import { useRouter } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/shared/Loader";
import { PostData } from '@/lib/actions/post.actions';
import { UserData, fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from "@clerk/nextjs/server";
import { setUser } from "@/lib/redux/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";



interface redirectType {
  redirect: string;
}
interface FetchPostsResponse {
  posts: PostData[];
  hasMore: boolean;
  nextPage: number;
}

const fetchPosts = async ({ pageParam = 0 }): Promise<FetchPostsResponse> => {
  const PAGE_SIZE = 4;
  const response = await axios.get(`/api/posts/fetch?pageNum=${pageParam}&pageSize=${PAGE_SIZE}`);
  console.log(response.data); // Debugging statement
  return response.data;
};

export default function HOME() {
  const router = useRouter();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [action, setAction] = useState();
  const dispatch = useDispatch<AppDispatch>();
  // Fetch user information
  const {
    data: userInfo,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
  const {
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => currentUser(),
  });
  
  // Fetch posts using useInfiniteQuery
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error: postsError,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => {
      console.log(lastPage); // Debugging statement
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    initialPageParam: 0,
  });
  
  const loadMorePosts = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  
  useEffect(() => {
    dispatch(setUser(
     (userInfo as UserData)

    ));
  },[userInfo])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      {
        root: null,
        rootMargin: "200px", // Increased margin for better user experience
        threshold: 1.0,
      }
    );
    
    const sentinelElement = sentinelRef.current;
    if (sentinelElement) {
      observer.observe(sentinelElement);
    }
    
    return () => {
      if (sentinelElement) {
        observer.unobserve(sentinelElement);
      }
    };
  }, [loadMorePosts, hasNextPage, isFetchingNextPage]);
  
  if (userError|| postsError) return <div>Error loading data...</div>;
  if ( userLoading|| !postsData) return <Loader is />;
  
  // Explicitly cast postsData.pages to FetchPostsResponse[]
  const posts = postsData.pages.flatMap((page) => (page as FetchPostsResponse).posts);
  if (!userInfo) return <Loader is />;
  if ((userInfo as redirectType ).redirect) {
    router.replace((userInfo as redirectType ).redirect);
    return null; // تأكد من عدم إرجاع أي محتوى أثناء التوجيه
  }
  
  if (!user) router.replace("/sign-in");
  return (
    <div>
      <Home
        FPosts2={JSON.stringify(posts)}
        userInfo2={JSON.stringify(userInfo)}
        setAction={setAction}
      />
      {hasNextPage && !isFetchingNextPage && <div ref={sentinelRef} style={{ height: "1px" }} />}
      {isFetchingNextPage && <Loader is />}
    </div>
  );
}


// "use client";
// import Home from "@/components/shared/MainHome";
// import { useRouter } from "next/navigation";
// import { fetchPosts } from "@/lib/actions/post.actions";
// import { fetchUser } from "@/lib/actions/user.actions";
// import { useEffect, useState, useCallback } from "react";
// import Loader from "@/components/shared/Loader";
// import  useSWR  from 'swr';
// import axios from 'axios';

// const fetcher = (url: string) => axios.get(url).then(res => res.data);
// export default function HOME() {
//   const router = useRouter();
//   const [action, setAction] = useState();
//   const [userInfo, setUserInfo] = useState<string>();
//   const [FPosts, setFPosts] = useState<string>();
//   const [skip, setSkip] = useState(0);
//   const [isNext, setisNext] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const PAGE_SIZE = 4;

//   const { data, error, isLoading } = useSWR(`/api/posts/fetch?pageNum=${skip}&pageSize=${PAGE_SIZE}`, fetcher);
//   // if (isLoading) return <div>Loading...</div>;
//   // if (error) return <div>Error loading users</div>;
//   // if (data) return <div>data users</div>;
//   const loadPosts = useCallback(async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);

//     try {
//       const userInfo = await fetchUser();
//       if (!userInfo?.onboarding) {
//         router.replace("/onboarding");
//       }
//       userInfo && setUserInfo(JSON.stringify(userInfo));

//       const FPosts = await fetchPosts(skip, PAGE_SIZE);
//       FPosts &&
//         setFPosts((prevPosts) =>
//           prevPosts && prevPosts.length > 0
//             ? JSON.stringify([...JSON.parse(prevPosts), ...FPosts.posts])
//             : JSON.stringify([...FPosts.posts])
//         );
//       FPosts && setisNext(FPosts?.isNext);

//       setSkip((prevSkip) => prevSkip + PAGE_SIZE);
//       if (FPosts?.posts && FPosts.posts.length < PAGE_SIZE) {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error loading posts:", error);
//     }

//     setLoading(false);
//   }, [loading, hasMore, skip, router]);

//   useEffect(() => {
//     loadPosts();
//   }, [action, loadPosts]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop <
//         document.documentElement.offsetHeight - 100
//       )
//         return;
//       loadPosts();
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [loadPosts]);

//   return FPosts && userInfo ? (
//     <Home FPosts2={FPosts} userInfo2={userInfo} setAction={setAction} />
//   ) : (
//     <Loader is />
//   );
// }
