"use client";
import { createMessage } from "@/lib/actions/message.actions";
import { PostData } from "@/lib/actions/post.actions";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/shared/Loader";
import { UserData } from "@/lib/actions/user.actions";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { pusherClient } from "@/lib/pusher";
import { GetChat } from "@/lib/actions/room.actions";

interface User {
  _id: string;
  id: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  sport: string;
  phone: string;
  posts: PostData[];
  communities: string[];
  onboarding: boolean;
  type: string;
  friends: Friend[];
}

interface Friend {
  _id: string;
  id: string;
  name: string;
  username: string;
  image: string;
}

interface Message {
  content: string;
  sender: {
    _id: string | undefined;
    id: string | undefined;
    name: string | undefined;
    image: string | undefined;
    sport: string | undefined;
  };
  timestamp: Date;
  recipient: string;
}

const ChatBox: React.FC<{ Ids?: string }> = ({ Ids }) => {
  let frindId=Ids?.split("-")[1];
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let path= usePathname()
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserData | null | undefined>(null);
  const [chatJSon, setChat] = useState<string>(); 
  let chat=chatJSon&&JSON.parse(chatJSon)
  console.log(chat)
  useEffect(() => {
    const fetchData = async () => {
      const userInfoJson = sessionStorage.getItem("userInfo");
      const user = sessionStorage.getItem("id");
      const userInfo2 = userInfoJson ? JSON.parse(userInfoJson) : null;
      setUserInfo(userInfo2);
      if (!user) return router.replace("/sign-in");
      if (!userInfo2?.onboarding) router.replace("/onboarding");
      if(frindId){
      const chat=await GetChat({
        friendId:frindId,
        userId:userInfo2?._id,
        path:path
      })
      chat && setChat(JSON.stringify(chat));
    }
  };

    fetchData();
  }, [router]);

  useEffect(() => {
    const subscribedChannel = pusherClient.subscribe("chat");
    chat&&chat?.chat&&chat?.chat?.name&&
    subscribedChannel.bind(chat.chat.name, (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      // alert(JSON.stringify(msg));
    });
    return () => {
      pusherClient.unsubscribe("chat");
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleMessageSend = async () => {
    console.log(inputValue,chat?.chat?.name);
    if (inputValue.trim() === "") return;
    if (!userInfo) return;
    const newMessage: Message = {
      content: inputValue,
      sender: {
        _id: userInfo?._id,
        id: userInfo?.id,
        name: userInfo?.name,
        image: userInfo?.image,
        sport: userInfo?.sport,
      },
      timestamp: new Date(),
      recipient: frindId ? frindId : "",
    };

    try {
      frindId &&
        userInfo &&chat&&
        (await createMessage(JSON.stringify(userInfo), frindId, inputValue,chat?.chat?.name));
    } catch (error) {
      console.error("Error sending message:", error);
      return;
    }

    // frindId && userInfo && channel?.trigger('client-chat-message', newMessage); // استخدام trigger على القناة المشتركة

    setInputValue("");
    inputRef.current?.focus();
  };

  return userInfo ? (
    <div className="bg-gray-100 bottom-0 p-4 rounded-lg w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => {
          const timestamp = formatDistanceToNow(message.timestamp, {
            locale: ar,
          });
          return (
            <div key={index} className="mb-2 flex">
              <img
                src={message.sender.image}
                alt={message.sender.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{message.sender.name}</span>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs text-gray-500">{timestamp}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex absolute bottom-2 w-full">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-2 border border-gray-300 rounded-lg mr-2"
        />
        <button
          onClick={handleMessageSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          <Image src="/assets/send.svg" alt="send" height={40} width={40} />
        </button>
      </div>
    </div>
  ) : (
    <Loader is />
  );
};

export default ChatBox;

// import React, { useState, useRef, useEffect } from 'react';
// import  Image  from 'next/image';
// import {  UserData } from "@/lib/actions/user.actions";
// import { useRouter } from "next/navigation";
// import Loader from "@/components/shared/Loader";
// import { PostData } from '@/lib/actions/post.actions';
// interface User {
//   _id: string;
//   id: string;
//   username: string;
//   name: string;
//   bio: string;
//   image: string;
//   sport: string;
//   phone: string;
//   posts: PostData[];
//   communities: string[];
//   onboarding: boolean;
//   type: string;
//   friends: Friend[];
// }

// interface Friend {
//   _id: string;
//   id: string;
//   name: string;
//   username: string;
//   image: string;
// }

// interface Message {
//   content: string;
//   sender: string;
//   senderAvatar: string;
//   timestamp: string;
// }

// const ChatBox: React.FC<{frindId?:string}> = ({ frindId }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState<string>('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   let router= useRouter()
//     let user ;
//     const [userInfo, setUserInfo] = useState<UserData | null | undefined  >(null);
//     useEffect(()=>{
//       let userJson=sessionStorage.getItem("id")
//       let userInfoJson=sessionStorage.getItem("userInfo")
//       user= userJson
//       let userInfo2=userInfoJson? JSON.parse(userInfoJson):null;
//       setUserInfo(userInfo2);
//       if (!user) return router.replace('/sign-in');
//       if (!userInfo2?.onboarding) router.replace("/onboarding");

//     },[])
//   useEffect(() => {
//     // Scroll to the bottom of the messages list when it updates
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleMessageSend = () => {
//     if (inputValue.trim() === '') return;
//     const newMessage: Message = {
//       content: inputValue,
//       sender: userInfo?.username ? userInfo.username : '',
//       senderAvatar: userInfo?.image ? userInfo.image : '',
//       timestamp: new Date().toISOString(),
//     };
//     setMessages([...messages, newMessage]);
//     setInputValue('');
//     inputRef.current?.focus(); // Focus on the input field after sending a message
//   };

//   return (userInfo?
//     <div className="bg-gray-100  bottom-0 p-4 rounded-lg w-full h-full flex flex-col">
//       {/* Messages section */}
//       <div className="flex-1 overflow-y-auto">
//         {messages.map((message, index) => (
//           <div key={index} className="mb-2 flex">
//             <img
//               src={message.senderAvatar}
//               alt={message.sender}
//               className="w-8 h-8 rounded-full mr-2"
//             />
//             <div className="flex flex-col">
//               <span className="font-semibold">{message.sender}</span>
//               <p className="text-sm">{message.content}</p>
//               <span className="text-xs text-gray-500">{message.timestamp}</span>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Chat input */}
//       <div className="mt-4 flex absolute bottom-2 w-full">
//         <input
//           ref={inputRef}
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Type your message..."
//           className="w-full px-2 border border-gray-300 rounded-lg mr-2"
//         />
//         <button
//           onClick={handleMessageSend}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           <Image src={'/assets/send.svg'} alt="send" height={40} width={40}/>
//         </button>
//       </div>
//     </div>:<Loader is/>
//   );
// };

// export default ChatBox;
