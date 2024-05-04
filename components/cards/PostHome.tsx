import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PostButtonHome = () => {

  return (
    <div className="text-white font-bold px-4 flex gap-7 cursor-pointer">

    <Link href={'/new-post?sh=true'}
      className=" text-white font-bold px-4 flex cursor-pointer "
      >
      <Image src={'/assets/createimg.svg'} alt={''} height={30} width={30} className={'rounded-full object-contain'}/>
      
    </Link>
    <Link href={'/new-post'}
      className="grow text-white font-bold px-4 flex cursor-pointer "
      >
      <div className="w-full  border-primary-500 border-2 rounded-full text-primary-500 px-7 py-3">
      What are you thinking?     
       </div>
    </Link>
      </div>
  );
};

export default PostButtonHome;
