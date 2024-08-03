"use client";
import { useState, useEffect } from "react";
import { fetchAllUser, fetchUser } from "@/lib/actions/user.actions";
import { SugCard } from "../cards/sugCard";

interface Props {
  isChat?: boolean;
  Ids?: string;
  isxl?: boolean;
  islg?: boolean;
  setChat?: any;
}

const RightSidebar = ({ isChat, Ids, isxl, islg, setChat }: Props) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);
  const [refrish, setrefrish] = useState<any>(null);

  useEffect(() => {
    // if (
    //   Notification.permission !== "granted" &&
    //   Notification.permission !== "denied"
    // ) {
    //   Notification.requestPermission().then((permission) => {
    //     if (permission === "granted") {
    //       console.log("Notification permission granted.");
    //     } else {
    //       console.log("Notification permission denied.");
    //     }
    //   });
    // }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await fetchUser();
        const users = await fetchAllUser({
          searchString: "",
          pageNum: 1,
          pageSize: 100,
        });
        setUserInfo(userInfo);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refrish]);
  return (
    <section
      className={`rightsidebar custom-scrollbar  ${
        isxl ? "w-full" : "max-xl:hidden"
      }  ${isChat ? ` p-0 ${!Ids && " px-1"} w-96` : "p-3 pt-28 w-72"}`}>
      <div className="flex flex-1 flex-col justify-start">
        {!isChat && (
          <h1 className=" text-heading4-medium text-light-1 mb-6">Player</h1>
        )}
        {users && users.users && userInfo && (
          <SugCard
            result2={JSON.stringify(users.users)}
            userInfo2={JSON.stringify(userInfo)}
            type={"users"}
            isChat={isChat}
            Ids={Ids ? Ids : ""}
            islg={islg}
            refrish={setrefrish}
            setChat={setChat}
          />
        )}
      </div>
    </section>
  );
};

export default RightSidebar;
