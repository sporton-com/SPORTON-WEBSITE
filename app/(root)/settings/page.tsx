import Search from "@/components/shared/Search";
import { fetchUser, UserData } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import  Image  from "next/image";
import  Link  from "next/link";
const Page = async() => {
  let user = await currentUser();
  if (!user) return redirect('/sign-in');
  const userInfo : UserData | null | undefined = await fetchUser(user.id);
  if (!userInfo?.onboarding) redirect("/onboarding");
  return (<div className="">
    <div className="mb-20">Settings</div>
    <ul className="flex flex-col gap-9">
  <li>
      <Link href={user?.id?"/profile/edit/"+user.id:'' }className="text-primary-500 flex gap-4 hover:opacity-75 text-body-bold">
        <Image
                src="/assets/edit.svg"
                alt="edit"
                className=""
                width={24}
                height={24}
                />
          Edit Profile</Link>
                </li>
  <li>
    <Link href="/boosting" className="text-primary-500 flex hover:opacity-75 gap-4 text-body-bold">
        <Image
                src="/assets/boosting.svg"
                alt="boosting"
                className=""
                width={24}
                height={24}
                />
          Boosting Profile</Link>
                </li>
  <li>
    <Link href="/new-post" className="text-primary-500 flex hover:opacity-75 gap-4 text-body-bold">
              <Image
                src="/assets/createimg.svg"
                alt="create post"
                className=""
                width={24}
                height={24}
                />
          New Post</Link>
                </li>
                </ul>
                </div>
  );
};

export default Page;
