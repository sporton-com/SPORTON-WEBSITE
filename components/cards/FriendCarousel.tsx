// components/FriendCarousel.js

import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Input
} from "@/components/ui/input"
import Link from 'next/link';
import Image from 'next/image';


const FriendCarousel = ({ url, title,friends }:{url:string,title:string,friends:any[]}) => {
  const [Friends, setFriends] = useState(friends.slice(0,7));
  const [searchQuery, setSearchQuery] = useState('');
  const encodedMessage = encodeURIComponent(`${title} \n ${url}`);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4
    }
  };
let frindsQ=searchQuery?filteredFriends:friends;
  return (
    <div>
      <Carousel responsive={responsive}>
        {Friends.map(friend => (
          <div key={friend.id} className="friend-card">
            <Link
              href={`/messaging/${friend.id}?m=${encodedMessage}`}
              className="flex flex-col items-center"
            >
            <Image src={friend.image} alt={friend.name} height={80} width={80} className="rounded-full"/>
            <p className="">{friend.name}</p>
            </Link>
          </div>
        ))}
      {friends.length>6&&(
      <Dialog>
  <DialogTrigger><div className="friend-card">
            <div
              className="flex flex-col items-center h-20 w-20 rounded-full justify-center bg-[#eeeeee]/50"
            >
               <Image
            src={`/assets/points-virtical-white.svg`}
            alt={"points"}
            className={"rotate-90"}
            height={5}
            width={5}
          />
           
            </div>
        <p className="">More</p>
          </div></DialogTrigger>
  <DialogContent className={'bg-[#efefef]'}>
    <DialogHeader>
      <DialogTitle>Send to friends</DialogTitle>
      <div> <Input
                  placeholder="Search your friend "
                  onChange={handleSearchChange}
                  className=" no-focus border-none bg-dark-1 text-white"
                /></div>
      <DialogDescription>
      
          <ul className="space-y-4">
            {frindsQ.map(friend => (
              <li key={friend.id} className="p-4 border   rounded-md flex items-center">
                <div key={friend.id} className="flex ">
            <Link
              href={`/messaging/${friend.id}?m=${encodedMessage}`}
              className="flex  items-center"
            >
             <div
                    className="relative w-11 h-11">
                    <Image
                      src={friend.image}
                      alt={friend.name}
                      fill
                      className="cursor-pointer rounded-full"
                    />
                  </div>
            <div className="-translate-y-3 ps-4">
                  <Image
                    src={"/" + friend.sport.split(" ")[0] + ".svg"}
                    alt={friend.sport}
                    height={30}
                    width={30}
                    className="-translate-x-4"
                  />
                  <div
                    className=" cursor-pointer w-full flex gap-4 ">
                    <div className=" cursor-pointer w-full flex gap-[3px]">
                      <h5>{friend.name}</h5>
                      <Image
                        src={"/golden.svg"}
                        alt={"golden"}
                        height={20}
                        width={20}
                        className=" max-sm:scale-150"
                      />
                    </div>
                  </div>
                </div>
            </Link>
          </div>
              </li>
            ))}
          </ul>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>)}
</Carousel>
    </div>
  );
};

export default FriendCarousel;
