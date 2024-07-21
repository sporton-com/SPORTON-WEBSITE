

"use client"
import ChatBox from '@/components/shared/ChatBox';
import RightSidebar from '@/components/shared/RightSidebar';
import { useEffect, useState } from 'react';
// import { Metadata } from "next";
import { useSearchParams } from 'next/navigation';

// export const metadata: Metadata = {
//   title: "SPORTEN | Messaging",
// };
export const dynamic = 'force-dynamic'
const ChatPage = () => {
  let searchParams=useSearchParams();
  let ids=searchParams.get('ids');
  let hasIds=searchParams.has('ids');
  const [size, setSize] = useState<number>()
  const [openChat, setChat] = useState<string>(hasIds?ids!:"");
useEffect(() => {
    setSize(window.innerWidth)
    window.addEventListener('resize',()=>{setSize(window.innerWidth)})
}, [size])
  return (
    <div className=" bg-[url(/assets/bg.jpg)] bg-center max-sm:bg-cover bg-[length:100%_100%] bg-no-repeat">
      {/* sm and md */}
    { size&&size<1280&& <div className="flex relative justify-center items-center overflow-hidden h-[100vh] ">
    <RightSidebar isChat isxl islg={false}  />
      </div>}
      {/* lg */}
     { size&&size>=1280&& <div className="flex relative justify-center items-center overflow-hidden h-[100vh] ">
    <RightSidebar isChat islg={true} setChat={setChat} Ids={openChat}/>
    <ChatBox Ids={openChat}/>
      </div>}
  </div>
  );
};

export default ChatPage;
