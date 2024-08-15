"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAddBusiness } from "react-icons/md";
import AddProductForm from "@/components/forms/AddProduct";
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { selectUser } from "@/lib/redux/userSlice";

const Topbar = () => {
  const path = usePathname();
  const show = path.split("/").pop() === "new-post";
  const userInfo = useSelector(selectUser);

  if (show) {
    return null;
  }
  // if (!userInfo) {
  //   return null;
  // }

  return (
    <section className="topbar">
      <div className="container p-0">
        <div className="flex flex-row justify-between">
          <Link
            href="/"
            className="flex items-center justify-between w-1/12 g-3 no-underline text-body-bold text-white">
            <div className="flex items-center gap-9">
              <div className="max-sm:w-16 max-sm:h-16 w-20 h-20 relative">
                <Image src="/logo5.gif" alt="" fill className="" />
              </div>
              <p className="ms-2 text-[#FF971D] -translate-x-10">SPORTON</p>
            </div>
          </Link>
          <div className="flex items-center p-1 lg:gap-9 gap-2">
            {path === "/store" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    <MdAddBusiness size={30} color="rgb(135 126 255)" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#ffffff]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Add New Product</AlertDialogTitle>
                    <AlertDialogDescription>
                      Fill out the form below to add a new product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AddProductForm userId={userInfo._id}/>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={"/messaging/"} className="">
                    <Image
                      src={`/assets/messnger-primary.svg`}
                      alt="Messaging"
                      height={30}
                      width={30}
                      className="hover:scale-125 cursor-pointer object-contain"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-primary-500">Go Messaging</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            { userInfo.image&&(
              <Link href={`/profile/${userInfo._id?userInfo._id:""}`} className="p-0">
                <Image
                  src={userInfo.image}
                  alt="Profile"
                  height={40}
                  width={40}
                  className="rounded-full object-contain"
                />
              </Link>
            )}
            {/* <ModeToggle/> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
