import { SignOutbutton } from "../../../components/cards/SignOutbutton";
import AccountProfile from "../../../components/forms/AccountProfile";
import { fetchUser } from "../../../lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connectDB } from "@/mongoose";
import React from "react";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "SPORTEN | onboarding",
// };
interface usData {
  id: string | undefined;
  objectID: string | undefined;
  username: string | null | undefined;
  name: string;
  bio: string;
  sport: string;
  image: string | undefined;
  type: string | undefined;
  phone: string | undefined;
}
const Onboarding = async () => {
  await connectDB();
  let user = await currentUser();
  const userInfo = await fetchUser();
  if (!user) redirect("/sign-in");
  if (userInfo?.onboarding) redirect("/");
  let userData: usData = {
    id: user?.id,
    objectID: userInfo?._id,
    username: user?.username || userInfo?.username,
    name: user?.firstName || userInfo?.name || "",
    bio: userInfo?.bio || "",
    sport: userInfo?.sport || "",
    image: user?.imageUrl || userInfo?.image,
    type: userInfo?.type,
    phone: userInfo?.phone,
  };
  return (
    <main className=" px-1 mx-auto py-12 flex flex-col max-w-3xl">
      <div className="px-10 fixed rounded-full lg:right-2  -right-4 top-10">
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
