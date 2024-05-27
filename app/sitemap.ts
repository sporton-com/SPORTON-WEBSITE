
import { fetchPosts } from "@/lib/actions/post.actions";
import { fetchAllUser } from "@/lib/actions/user.actions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPosts(1,1000) 
  const users = await fetchAllUser({searchString:"",pageNum:1,pageSize:1000}) 

if(posts &&users){
  const postEntries: MetadataRoute.Sitemap = posts.posts.map((post) => ({
    url: `https://www.sporton.website/posts/${post._id}`,
    lastModified: new Date(post.createdAt),
    changeFrequency:"hourly",
  }));
  const usersEntries: MetadataRoute.Sitemap = users?.users.map((user) => ({
    url: `https://www.sporton.website/profile/${user._id}`,
    lastModified: new Date(user.createdAt),
    changeFrequency:"hourly",
  }));

  return [
    {
      url: `https://www.sporton.website/about`,
      lastModified: new Date(),
    },
    ...postEntries,
    ...usersEntries
  ];
}else{
return [
  {
    url: `https://www.sporton.website/about`,
    lastModified: new Date(),
  },
];
}}