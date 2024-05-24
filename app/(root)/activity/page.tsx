"use client";
import Loader from "@/components/shared/Loader";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Page = () => {
  const router = useRouter();
  const [combinedList, setUserCombinedList] = useState<any[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const userInfo = await fetchUser();
        if (!userInfo?.onboarding) router.replace("/onboarding");
        if (userInfo) {
          let activitys = await getActivity(userInfo._id);
          if (activitys) {
            const combinedList = [...activitys.activity, ...activitys.reacts];
            combinedList.sort((a: any, b: any) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            });
            combinedList && setUserCombinedList(combinedList);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return combinedList ? (
    <section className="">
      <h1 className="mt-5  text-white text-body-bold text-[20px]">Notifications</h1>
      <section className="mt-5 flex flex-col gap-8">
        {combinedList.length > 0 ? (
          <div className="flex flex-col bg-dark-2 rounded-lg overflow-hidden ">
            {combinedList.map((activity: any) => (
              <Link key={activity?._id} href={`/post/${activity?.parentId}`} className="notification">
                <article className="activity-card justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        activity.type === "react"
                          ? activity.user.image
                          : activity?.author.image
                      }
                      alt={
                        activity?.type === "react"
                          ? activity?.user?.name
                          : activity?.author?.name
                      }
                      width={40}
                      height={40}
                      className=" rounded-full object-contain"
                    />
                    <div className=" !text-small-regular text-light-1 flex max-sm:flex-col">
                      <p className="mr-1 text-primary-500">
                        {activity?.type === "react"
                          ? activity?.user?.name
                          : activity?.author?.name}
                      </p>
                      <p>
                        {activity?.type === "react"
                          ? "reacted to your post"
                          : "replied to your post"}
                      </p>
                    </div>
                  </div>
                  {activity?.type === "react" ? (
                    <Image
                      src={"/assets/heart-filled.svg"}
                      alt="heart"
                      height={20}
                      width={20}
                      className="  object-contain"
                    />
                  ) : (
                    <p>
                      {activity?.text.length > 13
                        ? activity?.text.slice(0, 13) + "..."
                        : activity?.text}
                    </p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  ) : (
    <Loader is />
  );
};

export default Page;
