
'use client'
import Search from "@/components/shared/Search";
import {  UserData } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Page = () => {
  let router= useRouter()
  useEffect(()=>{
    let userJson=localStorage.getItem("id")
    let userInfoJson=localStorage.getItem("userInfo")
    let user= userJson
    let userInfo:UserData=userInfoJson? JSON.parse(userInfoJson):null;
    if (!user) return router.replace('/sign-in');
    if (!userInfo?.onboarding) router.replace("/onboarding");
  },[])
  return (
    <Search />
  );
};

export default Page;
