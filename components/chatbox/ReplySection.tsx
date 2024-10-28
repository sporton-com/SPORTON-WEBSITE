// components/ReplySection.tsx
import React from 'react';
interface Message {
    _id:string;
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
      replyTo?: string; //  يدعم الردود على الرسائل
    }
interface ReplySectionProps {
  replyToMessageId: string | null;
  messages: Message[];
  setReplyToMessageId: (id: string | null) => void;
}

const ReplySection: React.FC<ReplySectionProps> = ({ replyToMessageId, messages, setReplyToMessageId }) => {
  return replyToMessageId ? (
    <div className="bg-gray-200 p-2 rounded mb-2">
      <span>Replying to:</span>
      <p>{messages.find(msg => msg._id === replyToMessageId)?.content}</p>
      <button onClick={() => setReplyToMessageId(null)}>Cancel Reply</button>
    </div>
  ) : null;
};

export default ReplySection;
