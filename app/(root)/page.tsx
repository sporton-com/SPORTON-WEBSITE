import Home from "@/components/shared/MainHome";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchPosts } from "@/lib/actions/post.actions";
import { UserData, fetchUser } from "@/lib/actions/user.actions";

export default async function HOME() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const userInfo = await fetchUser(user.id);
        if (!userInfo || !userInfo.onboarding) 
          redirect("/onboarding");
        const FPosts = await fetchPosts(1, 1000);

  return (
    <Home id={user.id} FPosts={FPosts} userInfo={userInfo}/>
  );
}



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// import CardPost from "@/components/cards/CardPost";
// import PostButtonHome from "@/components/cards/PostHome";
// import LocalStore from "@/components/cards/LocalStore";
// import { fetchPosts } from "@/lib/actions/post.actions";
// import { fetchUser } from "@/lib/actions/user.actions";
// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// export default async function Home() {
//   const user = await currentUser();
//   if (!user) return redirect("/sign-in");
//   const userInfo = await fetchUser(user.id);
//   if (!userInfo?.onboarding) redirect("/onboarding");
//   const FPosts = await fetchPosts(1, 1000);
//   let friends=userInfo?.friends;
//   return (
//     <main>
//         <PostButtonHome  />
//       <section className="p-8 pt-0 flex flex-col gap-8 max-sm:p-0">
//         <LocalStore  {...userInfo}/>
//         {FPosts?.posts.map((post) => (
//           <CardPost
//           Team={friends}
//             key={post?._id}
//             isAchievement={post?.isAchievement}
//             id={post?._id}
//             video={post?.video}
//             image={post?.image}
//             parentId={post?.parentId}
//             react={post.react}
//             currentId={user?.id}
//             userId={userInfo?._id}
//             author={post?.author}
//             content={post?.text}
//             createdAt={post?.createdAt}
//             community={post?.community}
//             comments={post?.children}
//           />
//         ))}
//       </section>
//     </main>
//   );
// }
