'use client'
import { PostData } from "@/lib/actions/post.actions";
import React from "react";
import CardPost from "../cards/CardPost";
interface props {
  currentUserId: string | undefined;
  Team: any[];
  accountType: string;
  userId:string|undefined
  result:Result|undefined|null;
}

interface Result {
  _id: string;
  name: string;
  image: string;
  id: string;
  sport: string;
  posts: PostData[]|undefined;
}

function PostTab({result, userId,currentUserId, Team, accountType }: props) {
  return (
    <div className="flex flex-col gap-10 ">
      
       {  result?.posts?.map((post: PostData,i:number) => (
       <CardPost
       
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
