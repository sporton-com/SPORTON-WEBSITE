

import ChatBox from '@/components/shared/ChatBox';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPORTEN | Messaging",
};
const ChatPage = () => {

  return (

    <div className="flex relative justify-center items-center overflow-hidden h-[70vh]  lg:h-[80vh]">
      <ChatBox />
    </div>
  );
};

export default ChatPage;
