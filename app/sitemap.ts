
import { fetchPosts } from "@/lib/actions/post.actions";
import { fetchAllUser } from "@/lib/actions/user.actions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPosts(1,1000) 


if(posts){
  const postEntries: MetadataRoute.Sitemap = posts.posts.map((post) => ({
    url: `https://www.sporton.website/posts/${post._id}`,
    lastModified: new Date(post.createdAt),
    changeFrequency:"hourly",
  }));

  return [
    {
      url: `https://www.sporton.website/about`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}else{
return [
  {
    url: `https://www.sporton.website/about`,
    lastModified: new Date(),
  },
];
}}