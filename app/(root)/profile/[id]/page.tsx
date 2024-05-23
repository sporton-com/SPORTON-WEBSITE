"use client"
import UserCard from "@/components/cards/UserCard";
import PostTab from "@/components/shared/PostTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/icons";
import { fetchUser, Result, UserData } from "@/lib/actions/user.actions";
import Image from "next/image";
import {  useRouter } from "next/navigation";
import { fetchUserPosts } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";
const Page = ({ params }: { params: { id: string } }) => {
  const [userInfo, setUserInfo] = useState<UserData|null>(null);
  const [MyInfo, setUserMyInfo] = useState<UserData|null>(null);
  const [friends, setUserfriends] = useState<any[]|null>(null);
  const [result, setResult] = useState<Result|null>(null);
  const [result2, setResult2] = useState<any>(null);
  const [postsAchievements, SetPostsAchievements] = useState<any[]|null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        let userJson = localStorage.getItem("id");
        const user = userJson;
        const userInfo: UserData | null | undefined = await fetchUser(
          params.id
        );
        if (!user) return router.replace("/sign-in");
        if (!userInfo?.onboarding) router.replace("/onboarding");
        userInfo && setUserInfo(userInfo);
        let MyInfo = await fetchUser(user);
        MyInfo && setUserMyInfo(MyInfo);
        let friends =
          params.id === user ? MyInfo?.friends : userInfo?.friends;
        let result = userInfo && await fetchUserPosts(userInfo?.id);
        let postsAchievements = result?.posts?.filter(
          (e) => e?.isAchievement === "1"
        );

        let result2 = {
          ...result,
          posts: postsAchievements ? postsAchievements : [],
        };
        friends && setUserfriends(friends);
        result&&setResult(result);
        result2&&setResult2(result2);
        postsAchievements&& SetPostsAchievements(postsAchievements);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, perhaps show a message to the user
      }
    }

    fetchData();
  }, []);
  return (
    userInfo&&
MyInfo&&
friends&&
result&&
result2&&
postsAchievements?
    <section className="">
      <ProfileHeader
        accountId={userInfo._id}
        userId={userInfo.id}
        myId={MyInfo?._id}
        userAuthId={MyInfo.id}
        friends={friends}
        sport={userInfo.sport}
        name={userInfo.name}
        username={userInfo.username}
        image={userInfo?.image}
        bio={userInfo.bio}
        type={"User"}
      />
      <div className="mt-8">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab1">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  height={24}
                  width={24}
                  className="object-contain"
                />
                <p className=" max-sm:hidden">{tab.label}</p>

                <p className=" bg-dark-3 border border-light-1 rounded-full px-2 text-base-regular">
                  {tab.label === "Posts"
                    ? userInfo?.posts?.length
                    : tab.label === "Team"
                    ? friends?.length
                    : postsAchievements?.length}
                </p>
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full mt-8 text-light-1">
              {tab.value === "friends" ? (
                <section className="flex flex-col gap-10">
                  {userInfo.friends.map((friend: any) => (
                    <UserCard person={JSON.stringify(friend)} />
                  ))}
                </section>
              ) : tab.value === "posts" ? (
                result && (
                  <PostTab
                    userId={userInfo._id}
                    result2={JSON.stringify(result)}
                    currentUserId={MyInfo.id}
                    Team={friends ? friends : []}
                    accountType="User"
                  />
                )
              ) : (
                result2 && (
                  <PostTab
                    userId={userInfo._id}
                    result2={JSON.stringify(result2)}
                    currentUserId={MyInfo.id}
                    Team={friends ? friends : []}
                    accountType="User"
                  />
                )
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>:<Loader is />
  );
};

export default Page;
