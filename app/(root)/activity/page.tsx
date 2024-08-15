"use client";
import Loader from "@/components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserData, fetchUser, getActivity } from "@/lib/actions/user.actions";

const Page = () => {
  const router = useRouter();

  // استخدام useQuery للحصول على معلومات المستخدم
  const {
    data: userInfo,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });

  const {
    data: activitys,
    error: activityError,
    isLoading: activityLoading,
  } = useQuery({
    queryKey: ["activity", (userInfo as UserData)?._id],
    queryFn: () => getActivity(userInfo ? (userInfo as UserData)._id : ""),
    enabled: !!userInfo, // فقط اجلب النشاطات إذا كانت معلومات المستخدم متاحة
  });

  // التعامل مع حالة التحميل
  if (userLoading || activityLoading) return <Loader is />;
  // التعامل مع الأخطاء
  if (userError || activityError) {
    console.error("Error fetching data:", userError || activityError);
    return <p>Error loading data.</p>;
  }

  // التحقق من بيانات المستخدم
  if (!userInfo) return <Loader is />;
  interface redirectType {
    redirect: string;
  }
  if ((userInfo as redirectType ).redirect) {
    router.replace((userInfo as redirectType ).redirect);
    return null; // تأكد من عدم إرجاع أي محتوى أثناء التوجيه
  }
  
  // دمج الأنشطة والردود
  const combinedList = activitys
    ? [...activitys.activity, ...activitys.reacts].sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : null;

  // عرض المحتوى
  return combinedList ? (
    <section className="">
      <h1 className="mt-5 text-white text-body-bold text-[20px]">
        Notifications
      </h1>
      <section className="mt-5 flex flex-col gap-8">
        {combinedList.length > 0 ? (
          <div className="flex flex-col bg-dark-2 rounded-lg overflow-hidden ">
            {combinedList.map((activity: any) => (
              <Link
                key={activity?._id}
                href={`/post/${activity?.parentId}`}
                className="notification">
                <article className="activity-card justify-between">
                  <div className="flex items-center gap-3">
                  <div className="relative   aspect-square h-16 w-16  ">
                <img
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
                  className="absolute inset-0 w-full h-full rounded-full object-cover"
                />
              </div>
                    {/* <Image
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
                      className="rounded-full object-contain"
                    /> */}
                    <div className="!text-small-regular text-light-1 flex max-sm:flex-col">
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
                      className="object-contain"
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
