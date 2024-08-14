import { useEffect, useRef } from "react";

interface InfiniteScroll {
  hasMore: boolean;
  scrollParent?: boolean;
  fetchMoreData?: () => Promise<void>;
  postEnd?: boolean;
}

/**
 * A hook that listens to scroll events for infinite scrolling (Client)
 * @param {boolean} scrollParent - Whether to use the parent element for scrolling
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {Function} [fetchMoreData] - Function to fetch more data
 * @param {boolean} [postEnd] - Whether the scrolling has reached the end
 */
export default function useInfiniteScroll({
  hasMore,
  scrollParent = false,
  fetchMoreData,
  postEnd = false,
}: InfiniteScroll) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const { scrollTop, clientHeight, scrollHeight } = target;

      if (scrollHeight - scrollTop <= clientHeight + 1) {
        if (hasMore) {
          fetchMoreData?.();
        }
      }

      if (postEnd) {
        target.removeEventListener("scroll", handleScroll);
      }
    };

    const element = scrollParent ? scrollRef.current?.parentElement : scrollRef.current;

    element?.addEventListener("scroll", handleScroll);

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
  }, [fetchMoreData, hasMore, postEnd, scrollParent]);

  return { scrollRef };
}
