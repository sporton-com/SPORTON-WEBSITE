import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { UserData, fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

interface userData{
    id:string,
    objectID:string | undefined,
    username:string |null,
    name:string,
    bio:string,
    image:string,
    type:string,
    phone:string,
    sport:string
    email:string
}
async function Page({params}:{params:{id:string}}) {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const userInfo =  await fetchUser(params.id);

  const userData:userData = {
    id: user?.id,
    email:(userInfo as UserData).email ,
    objectID: (userInfo as UserData)?._id,
    username: userInfo ? (userInfo as UserData)?.username : user.username,
    name: userInfo ? (userInfo as UserData)?.name : user.firstName ?? "",
    bio: userInfo ? (userInfo as UserData)?.bio : "",
    image: userInfo ? (userInfo as UserData)?.image : user.imageUrl,
    sport: userInfo ? (userInfo as UserData)?.sport : "",
    type:userInfo ? (userInfo as UserData)?.type : "player",
    phone:userInfo ? (userInfo as UserData)?.phone : "",
  };

  return (
    <>
      <h1 className="head-text">Edit Profile {(userInfo as UserData)?.name}</h1>
      {/* <p className="mt-3 text-base-regular text-light-2">Make any changes</p> */}
      <section className="mt-12">
        <AccountProfile userData={userData} />
      </section>
    </>
  );
}

export default Page;
