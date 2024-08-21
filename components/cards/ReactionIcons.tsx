import React from 'react';
import Image from 'next/image';

interface ReactionIconsProps {
  isVisible: boolean;
  onReact: (reaction: string) => void;
  isWhite?: boolean;
}

const ReactionIcons = ({ isVisible, onReact, isWhite }: ReactionIconsProps) => {
  if (!isVisible) return null;

  return (
    <div className="absolute -top-16 flex items-center justify-between gap-2 p-2 w-96 bg-[#ffffff] rounded-lg shadow-md">
      {['like', 'love', 'support', 'wow', 'haha', 'sad', 'angry'].map((reaction) => (
        <Image
          key={reaction}
          src={`/assets/${reaction}.gif`}
          alt={reaction}
          height={40}
          width={40}
          className="hover:scale-125 cursor-pointer"
          onClick={() => onReact(reaction)}
        />
      ))}
    </div>
  );
};

export default ReactionIcons;
