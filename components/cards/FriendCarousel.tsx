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

const initialFriends = [
  { id: 1, name: 'Alice', imgSrc: '/images/alice.jpg', messageUrl: 'sms:+1234567890' },
  { id: 2, name: 'Bob', imgSrc: '/images/bob.jpg', messageUrl: 'sms:+1234567891' },
  { id: 3, name: 'Charlie', imgSrc: '/images/charlie.jpg', messageUrl: 'sms:+1234567892' },
  { id: 4, name: 'Dave', imgSrc: '/images/dave.jpg', messageUrl: 'sms:+1234567893' },
  { id: 5, name: 'Eve', imgSrc: '/images/eve.jpg', messageUrl: 'sms:+1234567894' },
  { id: 6, name: 'Frank', imgSrc: '/images/frank.jpg', messageUrl: 'sms:+1234567895' },
  { id: 7, name: 'Grace', imgSrc: '/images/grace.jpg', messageUrl: 'sms:+1234567896' },
  { id: 8, name: 'Hank', imgSrc: '/images/hank.jpg', messageUrl: 'sms:+1234567897' },
  // Add more friends as needed
];

const FriendCarousel = ({ url, title,friends }:{url:string,title:string,friends:any}) => {
  const [Friends, setFriends] = useState(initialFriends);
  const encodedMessage = encodeURIComponent(`${title} ${url}`);

  const addMoreFriends = () => {
    const moreFriends = [
      { id: 9, name: 'Ivy', imgSrc: '/images/ivy.jpg', messageUrl: 'sms:+1234567898' },
      { id: 10, name: 'Jack', imgSrc: '/images/jack.jpg', messageUrl: 'sms:+1234567899' },
      // Add more friends as needed
    ];
    setFriends([...Friends, ...moreFriends]);
  };

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

  return (
    <div>
      <Carousel responsive={responsive}>
        {Friends.map(friend => (
          <div key={friend.id} className="friend-card">
            <img src={friend.imgSrc} alt={friend.name} />
            <p className="legend">{friend.name}</p>
            <a
              href={`${friend.messageUrl}?body=${encodedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button"
            >
              Share with {friend.name}
            </a>
          </div>
        ))}
      
      <Dialog>
  <DialogTrigger>more</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</Carousel>
    </div>
  );
};

export default FriendCarousel;
