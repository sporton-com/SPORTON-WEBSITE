// app/post/[id]/page.tsx
"use client"
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById, PostData } from "@/lib/actions/post.actions";
import { fetchUser, UserData } from "@/lib/actions/user.actions";
import CardPost from "@/components/cards/CardPost";
import Comment from "@/components/forms/Comment";
import Loader from "@/components/shared/Loader";
import { useRouter } from "next/navigation";

const Post = ({ params }: { params: { id: string } }) => {
  let router= useRouter();
  const postId = params.id;

  // Fetch user info
  const { data: userInfo, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });

  // Fetch post data
  const { data: post, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ["activity", (userInfo as UserData)?._id],
    queryFn: () => fetchPostById(postId),
    enabled: !!postId, // Fetch post data only if userInfo is available
  });

  interface redirectType {
    redirect: string;
  }

  if ((userInfo as redirectType)?.redirect) {
    router.replace((userInfo as redirectType).redirect);
    return null; // Ensure nothing is returned during redirect
  }

  React.useEffect(() => {
    if (userError || postError) {
      console.error("Error fetching data:", userError || postError);
    }

    if (userInfo && !(userInfo as UserData).onboarding) {
      router.replace("/onboarding");
    }
  }, [userError, postError, userInfo, router]);

  if (userLoading || postLoading) return <Loader is />;
  if ((userInfo as redirectType).redirect) {
    router.replace((userInfo as redirectType).redirect);
    return null; // Ensure nothing is returned during redirect
  }
  if (!post) return null;

  return (
    <>
      <section className="relative">
        <h1 className="hidden">{post.text}</h1>
        <div className="">
          <CardPost
            Team={(userInfo as UserData)?.friends}
            react={post.react}
            isAchievement={post?.isAchievement}
            video={post?.video}
            image={post?.image}
            id={post._id}
            parentId={post.parentId}
            userId={(userInfo as UserData)?._id}
            currentId={(userInfo as UserData).id}
            author={post.author}
            content={post.text}
            createdAt={post.createdAt}
            community={post.community}
            comments={post.children}
          />
        </div>
        <div className="mt-5">
          <Comment
            postId={post._id}
            currentUserId={(userInfo as UserData)?._id}
            currentUserImg={(userInfo as UserData)?.image}
          />
        </div>
        <div className="mt-7">
          {post.children.map((child: any) => (
            <CardPost
              key={child._id}
              Team={(userInfo as UserData)?.friends}
              react={child?.react}
              id={child?._id}
              parentId={child?.parentId}
              userId={(userInfo as UserData)?._id}
              currentId={child?.id}
              author={child?.author}
              content={child?.text}
              createdAt={child?.createdAt}
              community={child?.community}
              comments={child?.children}
              isComment={true}
            />
          ))}
        </div>
      </section>
    </>
  );
};
export default Post;
