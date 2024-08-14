"use client"
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";

const Page = () => {
  const { data: userInfo, error, isLoading } =  useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });

  if (isLoading) return <Loader is />;
  if (error || !userInfo?.onboarding) {
    // Redirect to onboarding or show error message
    redirect("/onboarding");
    return null; // Prevent rendering in case of redirect
  }

  return (
    <div>
      <h1 className="hidden">Add Post</h1>
      <PostForm
        action="Create"
        id={userInfo._id}
        image={userInfo?.image}
        name={userInfo?.name}
        username={userInfo?.username}
      />
    </div>
  );
};

export default Page;
