

import ChatBox from '@/components/shared/ChatBox';

const ChatPage = ({ params }: { params: { id: string } }) => {

  return (

    <div className="flex relative justify-center items-center overflow-hidden h-[70vh]  lg:h-[80vh]">
      <ChatBox Ids={params.id}/>
    </div>
  );
};

export default ChatPage;
