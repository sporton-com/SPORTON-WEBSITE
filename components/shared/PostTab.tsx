'use client'
import { PostData } from "@/lib/actions/post.actions";
import React from "react";
import CardPost from "../cards/CardPost";
interface props {
  currentUserId: string | undefined;
  accountId: string|undefined;
  accountType: string;
  userId:string|undefined
  result:Result | undefined|null;
}

interface Result {
  _id: string;
  name: string;
  image: string;
  id: string;
  posts: PostData[]|undefined;
}

function PostTab({result, userId,currentUserId, accountId, accountType }: props) {
  return (
    <div className="flex flex-col gap-10 ">
      
       {  result?.posts?.map((post: PostData) => (<>
       <CardPost
          key={post._id}
          id={post._id}
          parentId={post.parentId}
          isAchievement={post?.isAchievement}
          currentId={currentUserId}
          author={
            accountType === "User" && result
            ? {
              _id: result._id,
              id: result.id,
              image: result.image,
              name: result.name,
                }
              : post.author
            }
            userId={userId}
            react={post.react}
            comments={post.children}
            content={post.text}
            createdAt={post.createdAt}
            />
            </>
      ))} 
    </div>
  );
}

export default PostTab;
