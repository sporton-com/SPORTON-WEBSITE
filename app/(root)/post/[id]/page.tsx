// app/post/[id]/page.tsx
import React from "react";

import { fetchPostById, PostData } from "@/lib/actions/post.actions";

import { Metadata, ResolvingMetadata } from 'next';
import Post from "./post";

const Page = ({ params }: { params: { id: string } }) => {
  
  return (
    <>
      <Post params={params}/>
    </>
  );
};

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { id: string } },parent: ResolvingMetadata): Promise<Metadata> {
  const postId = params.id;

  // Fetch post data
  const post = await fetchPostById(postId);
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post?.author.name || 'Post',
    description: post?.text || 'Description for the post',
    openGraph: {
      title: post?.author.name || 'Post',
      description: post?.text || 'Description for the post',
      images: [
        {
          url: post?.image || post?.video || 'https://www.sporton.website/logo.png',
          width: 800,
          height: 600,
          alt: post?.author.name || 'Title',
        },
       ... previousImages
      ],
      url: `https://${process.env.NEXT_PUBLIC_SITE_URL}/post/${post?._id}`,
    },
  };
}

export default Page;
