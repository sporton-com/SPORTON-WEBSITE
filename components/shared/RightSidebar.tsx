// "use server"
import { fetchAllUser, fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { SugCard } from "../cards/sugCard";

const RightSidebar = async ({isChat}:{isChat?:boolean}) => {
  let user = await currentUser();
  let userInfo = await fetchUser(user?.id);
  let users = await fetchAllUser({
    searchString: "",
    pageNum: 1,
    pageSize: 30,
  });

  return (
    <section className={`rightsidebar custom-scrollbar${isChat?" p-0 px-1 w-96":""}`}>
      <div className="flex flex-1 flex-col justify-start">
        {!isChat&&<h3 className=" text-heading4-medium text-light-1 mb-6">Suggested User</h3>}
        {users&& users?.users&&userInfo&&<SugCard result2={JSON.stringify(users.users)}  userInfo2={JSON.stringify(userInfo)} type={"users"} isChat={isChat}/>}
      </div>
    </section>
  );
};

export default RightSidebar;
