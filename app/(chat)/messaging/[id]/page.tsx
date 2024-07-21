

import ChatBox from '@/components/shared/ChatBox';
import RightSidebar from '@/components/shared/RightSidebar';

const ChatPage = ({ params }: { params: { id: string } }) => {

  return (
    <div className="flex relative justify-center items-center overflow-hidden h-[100vh]  lg:h-[100vh] bg-[url(/assets/bg.jpg)] bg-center max-sm:bg-cover bg-[length:100%_100%] bg-no-repeat" >
      <RightSidebar isChat Ids={params.id}/>
      <ChatBox Ids={params.id}/>
    </div>
  );
};

export default ChatPage;
