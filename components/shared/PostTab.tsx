'use client'
import { PostData } from "@/lib/actions/post.actions";
import React from "react";
import CardPost from "../cards/CardPost";
interface props {
  currentUserId: string | undefined;
  Team: any[];
  isGuest:boolean;
  accountType: string;
  userId:string|undefined
  result2:string;
}

interface Result {
  _id: string;
  name: string;
  image: string;
  id: string;
  sport: string;

  posts: PostData[]|undefined;
}

function PostTab({result2, userId,currentUserId, Team, accountType ,isGuest}: props) {
  let result:Result=JSON.parse(result2);
  return (
    <div className="flex flex-col gap-10 ">
      
       {  result?.posts?.map((post: PostData,i:number) => (
       <CardPost
       isGuest={isGuest}
       repost={post.repost}
          key={i}
          id={post._id}
          image={post?.image}
          video={post?.video}
          parentId={post.parentId}
          isAchievement={post?.isAchievement}
          currentId={currentUserId}
          Team={Team?Team:[]}
          author={
            accountType === "User" && result
            ? {
              _id: result._id,
              id: result.id,
              image: result.image,
              name: result.name,
              sport: result.sport
                }
              : post.author
            }
            userId={userId}
            react={post.react}
            comments={post.children}
            content={post.text}
            createdAt={post.createdAt}
            />
  
      ))} 
    </div>
  );
}

export default PostTab;
