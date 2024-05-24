

import ChatBox from '@/components/shared/ChatBox';
import RightSidebar from '@/components/shared/RightSidebar';
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "SPORTEN | Messaging",
// };
export const dynamic = 'force-dynamic'
const ChatPage = () => {

  return (
    <div className=" ">
      {/* sm and md */}
      <div className="max-xl:flex  hidden  relative justify-center items-center overflow-hidden h-[100vh] ">
    <RightSidebar isChat isxl />
      </div>
      {/* lg */}
      <div className="flex max-xl:hidden relative justify-center items-center overflow-hidden h-[100vh] ">

    <RightSidebar isChat />
    <ChatBox/>
      </div>
  </div>
  );
};

export default ChatPage;
