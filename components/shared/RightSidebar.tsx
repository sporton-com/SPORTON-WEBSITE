"use client";
import { useQuery } from '@tanstack/react-query';
import { UserData, fetchAllUser, fetchUser } from '@/lib/actions/user.actions';
import { SugCard } from '../cards/sugCard';
import { useRouter } from 'next/navigation';

interface Props {
  isChat?: boolean;
  Ids?: string;
  isxl?: boolean;
  islg?: boolean;
  setChat?: any;
  userInfo:UserData|{redirect: string}

}

const RightSidebar = ({ isChat, userInfo , Ids, isxl, islg, setChat }: Props) => {
  // استخدام React Query لجلب بيانات المستخدمين

  const { data: users, error: usersError, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchAllUser({
      searchString: "",
      pageNum: 1,
      pageSize: 100,
    }),
  });
  const router = useRouter();

  interface redirectType {
    redirect: string;
  }
  if ((userInfo as redirectType ).redirect) {
    router.replace((userInfo as redirectType ).redirect);
    return null; // تأكد من عدم إرجاع أي محتوى أثناء التوجيه
  }
  if (  usersError) {
    console.error('Error fetching data:', usersError);
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <section
      className={`rightsidebar custom-scrollbar ${
        isxl ? "w-full" : "max-xl:hidden"
      } ${isChat ? ` p-0 ${!Ids && " px-1"} w-96` : "p-3 pt-28 w-72"}`}>
      <div className="flex flex-1 flex-col justify-start">
        {!isChat && (
          <h1 className="text-heading4-medium text-light-1 mb-6">Player</h1>
        )}
        {users && users.users && userInfo && (
          <SugCard
            result2={JSON.stringify(users.users)}
            userInfo2={JSON.stringify((userInfo as UserData))}
            type={"users"}
            isChat={isChat}
            Ids={Ids ? Ids : ""}
            islg={islg}
            refrish={() => { /* handle refresh logic here if needed */ }}
            setChat={setChat}
          />
        )}
      </div>
    </section>
  );
};

export default RightSidebar;
