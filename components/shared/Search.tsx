'use client'
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import UserCard from "../cards/UserCard";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sports } from "@/constants/icons";
import { fetchAllUser } from "@/lib/actions/user.actions";
import UserCardSkeleton from "../cards/UserCardSkeleton";

const useFetchUsers = (searchString: string) => {
  return useInfiniteQuery({
    queryKey: ['users', searchString],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllUser({
        searchString,
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
const Search = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [show, setShow] = useState<boolean>(true);
  const [showC, setShowC] = useState<boolean>(true);
  const observerElem = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchUsers(searchString);

  useEffect(() => {
    refetch(); // Fetch data when searchString changes
  }, [searchString, refetch]);

  useEffect(() => {
    if (observerElem.current && hasNextPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 1.0 }
      );
      observer.observe(observerElem.current);
      return () => observer.disconnect();
    }
  }, [hasNextPage, fetchNextPage]);

  const handelOnChange = async (e: string) => {
    setSearchString(e);
    setShow(e === '');
    setShowC(e === '');
  };

  return (
    <section className="">
      <h1 className="text-white">{'Search'}</h1>
      <div className="w-full mt-3">
        <Input
          placeholder="Enter name or username or sport"
          className="account-form_input"
          onChange={(e) => handelOnChange(e.target.value)}
        />
      </div>

      {show && (
        <div className="mt-8">
          <Tabs defaultValue="" className="w-full">
            <TabsList className="grid grid-cols-3 gap-3 sm:grid-cols-6 h-auto p-3 justify-evenly">
              {sports.map((tab) => (
                (tab.label === "Football" || tab.label === "Running" || tab.label === "Tennis" || tab.label === "Basketball" || tab.label === "Swimming" || tab.label === "Karate") && (
                  <TabsTrigger onClick={() => { setShowC(false) }} key={tab.label} value={tab.value} className="tab2 flex-col bg-[#ffffff]">
                    <img
                      src={tab.icon}
                      alt={tab.label}
                      className="object-contain max-sm:h-[3.645rem] max-sm:w-[3.645rem] h-32 w-32"
                    />
                    <p className="max-sm:hidden">{tab.label}</p>
                  </TabsTrigger>
                )
              ))}
            </TabsList>

            {sports.map((tab) => (
              <TabsContent
                key={`content-${tab.label}`}
                value={tab.value}
                className="w-full mt-8 text-light-1">
                {data?.pages.map((page) =>
                  page.users
                    .filter((user) => user?.sport === tab.value.split(" ")[0])
                    .map((person: any) => (
                      <UserCard
                        key={person.id}
                        person={JSON.stringify(person)}
                      />
                    ))
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}

      {showC && (
        <div className={`mt-14 flex flex-1 ${'flex-col gap-9'}`}>
          { data?.pages.flatMap(page => page.users).length === 0 ? (
            <h1>no result</h1>
          ) : (
            data?.pages.flatMap(page => page.users).map((person: any) => (
              <UserCard
                key={person.id}
                person={JSON.stringify(person)}
              />
            ))
          )}
        </div>
      )}

      <div ref={observerElem} className="load-more-trigger mt-9">
        {isFetchingNextPage && <UserCardSkeleton/>}
      </div>
    </section>
  );
};

export default Search;
