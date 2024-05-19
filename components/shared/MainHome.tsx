"use client"
import { useState, useEffect } from 'react';
import CardPost from "@/components/cards/CardPost";
import PostButtonHome from "@/components/cards/PostHome";
import LocalStore from "@/components/cards/LocalStore";
import { PostData, fetchPosts } from "@/lib/actions/post.actions";
import { UserData, fetchUser } from "@/lib/actions/user.actions";
import { useRouter } from 'next/navigation';
import Loader from './Loader';

export default function Home({id}:{id:string}) {
  const [userInfo, setUserInfo] = useState<UserData>();
  const [FPosts, setFPosts] = useState<{
    posts: PostData[];
    isNext: boolean;
} | undefined>(undefined);
  const [friends, setFriends] = useState<{ _id: string; id: string; name: string; username: string; image: string; }[]>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {

        const userResponse = await fetchUser(id);
        if (!userResponse || !userResponse.onboarding) {
          router.replace("/onboarding");
          return;
        }

        const postsResponse = await fetchPosts(1, 1000);
        setFPosts(postsResponse);
        setUserInfo(userResponse);
        setFriends(userResponse.friends);
        console.log('success fetch data')
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, perhaps show a message to the user
      }
    }

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  return (
    friends&&userInfo&&FPosts?
    <main>
      <PostButtonHome />
      <section className="p-16 pt-0 flex flex-col gap-8 max-sm:p-0">
        <LocalStore {...userInfo}/>
        {FPosts?.posts.map((post) => (
          <CardPost
            Team={friends}
            key={post?._id}
            isAchievement={post?.isAchievement}
            id={post?._id}
            video={post?.video}
            image={post?.image}
            parentId={post?.parentId}
            react={post.react}
            currentId={userInfo?.id}
            userId={userInfo?._id}
            author={post?.author}
            content={post?.text}
            createdAt={post?.createdAt}
            community={post?.community}
            comments={post?.children}
          />
        ))}
      </section>
    </main>:<Loader is/>
  );
}

