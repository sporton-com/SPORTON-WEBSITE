import React, { useState } from 'react';
import { format } from 'date-fns';
import { CardMedia, Box } from '@mui/material';
import { IconShare, IconCopy, IconMessageCircle, IconMoodHappy } from '@tabler/icons-react';

interface Message {
  _id: string;
  content?: string;
  mediaUrl?: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  sender: {
    _id: string | undefined;
    id: string | undefined;
    name: string | undefined;
    image: string | undefined;
    sport: string | undefined;
  };
  recipient: {
    _id: string | undefined;
    id: string | undefined;
    name: string | undefined;
    image: string | undefined;
    sport: string | undefined;
  };
  timestamp: Date;
  isRead: boolean;
  isDelivered: boolean;
  reactions: Array<{
    emoji: string;
    userId: string;
  }>;
  replyTo?: string; // Supports replying to messages
}

const MessageItem: React.FC<{ message: Message;totalMessages: number; userId: string; openMenuId: string | null;index: number;  setOpenMenuId: (id: string | null) => void }> = ({ message,totalMessages,index, userId, openMenuId, setOpenMenuId }) => {

  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const timestamp = format(message.timestamp, 'HH:mm');

  const handleLongPress = (e: React.MouseEvent) => {
    e.preventDefault();
    const { innerWidth, innerHeight } = window;
    const menuWidth = 150;
    const menuHeight = 100;
    const top = e.clientY; // استخدام الموقع العلوي الأصلي

    // تحديد موقع اليسار بناءً على المرسل
    const left = message.sender._id === userId ? 20 : 60;
    
    // التأكد من أن القائمة لا تخرج من جانب الشاشة الأيمن
    const adjustedLeft = left + menuWidth > innerWidth ? innerWidth - menuWidth - 20 : left;

    // حساب المسافات المتبقية من الأعلى والأسفل
    const spaceAbove = top; 
    const spaceBelow = innerHeight - top;

    // تحديد الموضع العلوي بناءً على فهرس الرسالة
    let adjustedTop = top; // القيمة الافتراضية لموقع الأعلى
    if (index < 2) { // الرسائل الأولى
      adjustedTop += 20; // ارفع القائمة قليلاً لأسفل
    } else if (index >= totalMessages - 2) { // الرسائل الأخيرة
      adjustedTop -= menuHeight + 20; // اجعل القائمة فوق الرسالة قليلاً
    }

    // تعيين موضع القائمة
    setMenuPosition({ top: adjustedTop, left: adjustedLeft });

    // تبديل القائمة للرسالة المختارة
    if (openMenuId === message._id) {
      setOpenMenuId(null); // إغلاق إذا تم النقر على نفس الرسالة مرة أخرى
    } else {
      setOpenMenuId(message._id); // فتح القائمة للرسالة المختارة
    }
  };
  
  

  const handleMenuOptionClick = (option: string) => {
    console.log(`${option} clicked`);
    setOpenMenuId(null); // Close the menu after option is clicked
  };

  return (
    <div 
      className={`mb-2 flex relative ${message.sender._id === userId ? '' : 'flex-row-reverse'}`}
      onContextMenu={handleLongPress} // Pass the event directly
    >
      <div className="relative aspect-square max-sm:h-[20px] max-sm:w-[20px] h-[30px] w-[30px] mr-2">
        <img 
          src={message.sender.image!} 
          alt={message.sender.name!} 
          className="absolute inset-0 w-full h-full rounded-full object-cover" 
        />
      </div>
       <div className="">
      <div className={`flex relative w-fit min-w-[15rem] ${message.mediaUrl ? "min-w-[20rem] p-5 pt-0" : "min-w-[15rem] p-3 pt-0"} rounded-lg ${message.sender._id === userId ? 'bg-[#FF971D]' : 'bg-primary-500 text-[#ffffff]'}`}>

       
        <div className="flex flex-col relative w-full">
          <span className="font-semibold">{message.sender.name}</span>

          {/* Reply Section */}
          {message.replyTo && (
            <div className="text-xs text-gray-300 mb-1">
              Replying to: {message.replyTo}
            </div>
          )}

          {/* Message Content */}
          {message.type === 'text' ? (
            <p className="text-sm py-3">{message.content}</p>
          ) : message.type === 'audio' ? (
            <Box className="flex items-center w-full bg-transparent">
              <CardMedia 
                component="audio" 
                controls 
                src={message.mediaUrl} 
                className="w-full bg-transparent border-0" 
              />
            </Box>
          ) : message.type === 'image' ? (
            <CardMedia
              component="img"
              image={message.mediaUrl}
              alt="message image"
              className="rounded-lg"
            />
          ) : message.type === 'video' ? (
            <CardMedia
              component="video"
              controls
              src={message.mediaUrl}
              className="rounded-lg"
            />
          ) : null}

          {/* Reactions Section */}
          {message.reactions?.length > 0 && (
            <div className="flex mt-1">
              {message.reactions.map((reaction, index) => (
                <span key={index} className="text-sm mr-1">
                  {reaction.emoji}
                </span>
              ))}
            </div>
          )}

          {/* Timestamp and Delivery Indicators */}
          <div className={`text-xs absolute bottom-0 right-1 flex items-center space-x-1 ${message.sender._id === userId ? 'text-gray-500' : 'text-gray-300'}`}>
            <span className={`text-xs ${message.isDelivered ? 'text-gray-300' : 'hidden'}`}>✓</span>
            <span className={`text-xs ${message.isRead ? 'text-gray-300' : 'hidden'}`}>✓✓</span>
            <span>{timestamp}</span>
          </div>
          </div>
     

      {/* Context Menu */}
      {openMenuId === message._id && menuPosition && (
        <div 
          className="absolute bg-[#ffffff] shadow-lg rounded-lg p-2 flex flex-col z-[10000]" 
          style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}%`, transform: 'translate(-50%, -100%)' }} // Position menu at the cursor
        >
          <button className="flex items-center p-2 hover:bg-gray-100 rounded" onClick={() => handleMenuOptionClick('Reply')}>
            <IconMessageCircle size={16} className="mr-2" />
            Reply
          </button>
          <button className="flex items-center p-2 hover:bg-gray-100 rounded" onClick={() => handleMenuOptionClick('React')}>
            <IconMoodHappy size={16} className="mr-2" />
            React
          </button>
          <button className="flex items-center p-2 hover:bg-gray-100 rounded" onClick={() => handleMenuOptionClick('Copy')}>
            <IconCopy size={16} className="mr-2" />
            Copy
          </button>
          <button className="flex items-center p-2 hover:bg-gray-100 rounded" onClick={() => handleMenuOptionClick('Share')}>
            <IconShare size={16} className="mr-2" />
            Share
          </button>
        </div>
      )}
       </div>
       </div>
    </div>
  );
};

export default MessageItem;
