import { SignOutbutton } from "@/components/cards/SignOutbutton";
import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
interface usData {
  id: string | undefined;
  objectID: string | undefined;
  username: string | null | undefined;
  name: string;
  bio: string;
  sport: string;
  image: string | undefined;
  type: string;
}
const Onboarding = async () => {
  let user = await currentUser();
  const userInfo = await fetchUser(user?.id);
  // console.log(user);
  if (userInfo?.onboarding) redirect("/");
  let userData: usData = {
    id: user?.id,
    objectID: userInfo?._id,
    username: user?.username || userInfo?.username,
    name: user?.firstName || userInfo?.name || "",
    bio: userInfo?.bio || "",
    sport: userInfo?.sport || "",
    image: user?.imageUrl || userInfo?.image,
    type: "user",
  };
  return (
    <main className=" px-1 mx-auto py-12 flex flex-col max-w-3xl">
      <div className="px-10 absolute lg:right-2  -right-4 top-10">
        <SignOutbutton />
      </div>
      <h1 className="font-bold text-white">Onboarding</h1>
      <p className=" text-gray-500 my-6">
        This is where you will be able to create a new account.
      </p>
      <div className=" bg-dark-2  lg:p-10 p-2 ">
        <AccountProfile userData={userData} />
      </div>
    </main>
  );
};

export default Onboarding;
