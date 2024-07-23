"use client";
import Home from "@/components/shared/MainHome";
import { useRouter } from "next/navigation";
import { fetchPosts } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { useEffect, useState, useCallback } from "react";
import Loader from "@/components/shared/Loader";

export default function HOME() {
  const router = useRouter();
  const [action, setAction] = useState();
  const [userInfo, setUserInfo] = useState<string>();
  const [FPosts, setFPosts] = useState<string>();
  const [skip, setSkip] = useState(0);
  const [isNext, setisNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 4;

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const userInfo = await fetchUser();
      if (!userInfo?.onboarding) {
        router.replace("/onboarding");
      }
      userInfo && setUserInfo(JSON.stringify(userInfo));

      const FPosts = await fetchPosts(skip, PAGE_SIZE);
      FPosts &&
        setFPosts((prevPosts) =>
          prevPosts && prevPosts.length > 0
            ? JSON.stringify([...JSON.parse(prevPosts), ...FPosts.posts])
            : JSON.stringify([...FPosts.posts])
        );
      FPosts && setisNext(FPosts?.isNext);

      setSkip((prevSkip) => prevSkip + PAGE_SIZE);
      if (FPosts?.posts && FPosts.posts.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    }

    setLoading(false);
  }, [loading, hasMore, skip, router]);

  useEffect(() => {
    loadPosts();
  }, [action, loadPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 100
      )
        return;
      loadPosts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadPosts]);

  return FPosts && userInfo ? (
    <Home FPosts2={FPosts} userInfo2={userInfo} setAction={setAction} />
  ) : (
    <Loader is />
  );
}