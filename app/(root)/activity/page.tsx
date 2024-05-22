import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "SPORTEN | Activity",
// };
const Page = async () => {
  let user = await currentUser();
  if (!user) return redirect('/sign-in');
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarding) redirect("/onboarding");
  let activity = await getActivity(userInfo._id)
  let activityInfo = activity === undefined?[]:activity;
  return (
    <section className="">
        <h1 className=" text-white">
            Activity
        </h1>
        <section className=" mt-10 flex flex-col gap-8">
          {activityInfo.length > 0?<div className="flex flex-col gap-5">
            {activityInfo.map(activity =>
              <Link key={activity._id} href={`/post/${activity.parentId}`}>
                <article className="activity-card">
                <Image src={activity.author.image} alt={activity.author.name} width={40} height={40} className=' rounded-full object-contain' />
                <p className=" !text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">{activity.author.name}</span>
                  {' '} 
                  {activity.type === 'comment' ? 'replied to your post' : 'reacted to your post'}
                </p>
                </article>
              </Link>
              )}
          </div>:<p className="!text-base-regular text-light-3">No activity yet</p>}
        </section>
        </section>
  )
}

export default Page








// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { getActivity } from "@/lib/actions/user.actions";
// import Loader from "@/components/shared/Loader";

// const Page = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [activityInfo, setActivityInfo] = useState<Omit<any, never>[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchData() {
//       try{
//       let userJson = localStorage.getItem("id");
//       let userInfoJson = localStorage.getItem("userInfo");
//       const user = userJson;
//       const userData = userInfoJson ? JSON.parse(userInfoJson) : null;
//       if (!user) return router.replace("/sign-in");
//       if (!userData?.onboarding) router.replace("/onboarding");
//       setUserInfo(userData);
//       console.log(userData)
//         const activity = await getActivity(userData._id);
//         setActivityInfo(activity || []);
//       }catch (error) {
//         console.error('Error fetching data:', error);
//         // Handle error, perhaps show a message to the user
//       }
//     }

//     fetchData();
//   }, []); 

//   return activityInfo.length>0 && userInfo ? (
//     <section className="">
//       <h1 className="text-white">Activity</h1>
//       <section className="mt-10 flex flex-col gap-8">
//         {activityInfo.length > 0 ? (
//           <div>
//             {activityInfo.map((activity) => (
//               <Link key={activity._id} href={`/post/${activity.parentId}`}>
//                 <article className="activity-card">
//                   <Image
//                     src={activity.author.image}
//                     alt={activity.author.name}
//                     width={30}
//                     height={30}
//                     className="rounded-full object-contain"
//                   />
//                   <p className="!text-small-regular text-light-1">
//                     <span className="mr-1 text-primary-500">
//                       {activity.author.name}
//                     </span>{" "}
//                     replied to your post
//                   </p>
//                 </article>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <p className="!text-base-regular text-light-3">No activity yet</p>
//         )}
//       </section>
//     </section>
//   ) : (
//     <Loader is />
//   );
// };

// export default Page;

