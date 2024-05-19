

import ChatBox from '@/components/shared/ChatBox';

const ChatPage = ({id}:{id:string}) => {

  return (

    <div className="flex relative justify-center items-center overflow-hidden h-[70vh]  lg:h-[80vh]">
      <ChatBox frindId={id}/>
    </div>
  );
};

export default ChatPage;
