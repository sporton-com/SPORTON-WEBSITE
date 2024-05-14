
import UserCard from "@/components/cards/UserCard";
import PostTab from "@/components/shared/PostTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/icons";
import { fetchUser, Result, UserData } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { fetchUserPosts } from "@/lib/actions/user.actions";
const Page = async ({params}:{params:{id:string}}) => {
  let user = await currentUser();
  if (!user) return redirect('/sign-in');
  const userInfo : UserData | null | undefined = await fetchUser(params.id);
  if (!userInfo?.onboarding) redirect("/onboarding");
  let MyInfo = await fetchUser(user.id)
  let friends= params.id===user.id?MyInfo?.friends:userInfo?.friends;
  let result = await fetchUserPosts(userInfo?.id);
  let postsAchievements=result?.posts?.filter(e=>e?.isAchievement==="1")
  let result2:Result={...result,posts:postsAchievements?postsAchievements:[]};
  return (
    <section className="">
      <ProfileHeader
        accountId={userInfo._id}
        userId={userInfo.id}
        myId={MyInfo?._id}
        userAuthId={user.id}
        friends={friends}
        sport={userInfo.sport}
        name={userInfo.name}
        username={userInfo.username}
        image={userInfo?.image}
        bio={userInfo.bio}
        type={'User'}
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
                    {tab.label === "Posts" ? (userInfo?.posts?.length):tab.label === "Team"?(friends?.length):postsAchievements?.length}
                  </p>

              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full mt-8 text-light-1">
                {tab.value==='friends' ?
                <section className="flex flex-col gap-10">
                    {userInfo.friends.map((friend:any) =>
                        <UserCard
                        sport={friend.sport}
                        key={friend.id}
                        id={friend.id}
                        name={friend.name}
                        username={friend.username}
                        image={friend.image}
                        personType='User'
                        />
                        )}
                </section>
                :tab.value==='posts'
                ?
              <PostTab
              userId={userInfo._id}

                result={result}
                currentUserId={user?.id}
                Team={friends?friends:[]}
                accountType="User"
              />:
              <PostTab
              userId={userInfo._id}
                result={result2}
                currentUserId={user?.id}
                Team={friends?friends:[]}
                accountType="User"
              />
              }
            </TabsContent>
          ))}
        </Tabs>
      </div> 
    </section>
  );
};

export default Page;
