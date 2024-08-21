"use client"
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import BottomSidebar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import { ToastContainer } from "react-toastify";
import { fetchUser } from "@/lib/actions/user.actions";
import { useQuery } from "@tanstack/react-query";
import ReloadButton from "@/components/shared/reload";
import Loader from "@/components/shared/Loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: userInfo,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
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
        {userInfo &&  <RightSidebar  userInfo={userInfo}  />}
     <ToastContainer />
      </main>
      {userInfo && <BottomSidebar />}
    </>
  );
}
