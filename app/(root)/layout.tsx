"use client"
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import BottomSidebar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import { ToastContainer } from "react-toastify";
import { UserData, fetchUser } from "@/lib/actions/user.actions";
import { useQuery } from "@tanstack/react-query";
import ReloadButton from "@/components/shared/reload";
import Loader from "@/components/shared/Loader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
interface redirectType {
  redirect: string;
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size, setSize] = useState<number>()
  const router = useRouter();
  useEffect(() => {
    setSize(window.innerWidth)
    window.addEventListener('resize',()=>{setSize(window.innerWidth)})
}, [size])
  const {
    data: userInfo,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
  if ((userInfo as redirectType )?.redirect) {
    router.replace((userInfo as redirectType ).redirect);
    return null; // تأكد من عدم إرجاع أي محتوى أثناء التوجيه
  }
  if(userError) return <ReloadButton/>;
  if(userLoading) return <Loader is/>;

  return (
    <>
     {userInfo &&<Topbar userInfo={userInfo} />}
      <main className=" flex flex-row w-full">
      {userInfo &&<LeftSidebar />}
        <section className="main-container">
          <div className=" w-full max-w-4xl">
            {children}
            </div>
        </section>
        { size&&size>=1280&&userInfo &&  <RightSidebar  userInfo={(userInfo as UserData)}  />}
     <ToastContainer />
      </main>
      { size&&size<1280&&userInfo && <BottomSidebar userInfo={userInfo} />}
    </>
  );
}
