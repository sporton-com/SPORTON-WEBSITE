import React from 'react';
import Image from 'next/image';

interface ReactionIconsProps {
  isVisible: boolean;
  onReact: (reaction: string,img:string) => void;
  isWhite?: boolean;
}

const ReactionIcons = ({ isVisible, onReact, isWhite }: ReactionIconsProps) => {
  if (!isVisible) return null;

  return (
    <div className="absolute -top-[3.5rem] flex items-center justify-between gap-2 p-2 w-96 bg-[#ffffff] rounded-lg shadow-md">
      {['like', 'love', 'support', 'wow', 'haha', 'sad', 'angry'].map((reaction) => (
        <img
          key={reaction}
          src={`/assets/${reaction}.gif`}
          alt={reaction}
          height={"40px"}
          width={"40px"}
          className="hover:scale-125 cursor-pointer"
          onClick={() => onReact(reaction,`/assets/${reaction}.gif`)}
        />
      ))}
    </div>
  );
};

export default ReactionIcons;
