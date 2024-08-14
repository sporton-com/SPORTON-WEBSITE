
import { fetchPosts } from "@/lib/actions/post.actions";
import {  fetchAllUser } from "@/lib/actions/user.actions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPosts(1,100) 
  const users = await fetchAllUser({searchString:"",pageNum:1,pageSize:100}) 
console.log(users)
if(!posts ||!users){
  return [
    {
      url: `https://www.sporton.website/about`,
      lastModified: new Date(),
    },
  ];
}
  const postEntries: MetadataRoute.Sitemap = posts.posts.map((post) => ({
    url: `https://www.sporton.website/posts/${post._id}`,
    lastModified: new Date(post.createdAt),
    changeFrequency:"daily",
    priority:1
  }));
  const usersEntries: MetadataRoute.Sitemap = users.users.map((user) => ({
    url: `https://www.sporton.website/profile/${user.id}`,
    lastModified: new Date(user.updatedAt),
    changeFrequency:"daily",
    priority:1
  }));

  return [
    {
      url: `https://www.sporton.website/about`,
      lastModified: new Date(),
    },
    ...postEntries,
    ...usersEntries
  ];

}