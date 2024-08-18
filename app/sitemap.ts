import { MetadataRoute } from 'next';
import { fetchPosts } from '@/lib/actions/post.actions';
import { fetchUsers } from '@/lib/actions/user.actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await fetchPosts(1, 100);
    const users = await fetchUsers();

    if (!Array.isArray(posts.posts)) {
      console.error('Posts data is not an array:', posts.posts);
      return [];
    }

    if (!Array.isArray(users)) {
      console.error('Users data is not an array:', users);
      return [];
    }

    const postEntries = posts.posts.map((post: any) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.id}`,
      lastModified: post.updatedAt || post.createdAt,
    }));

    const userEntries = users.map((user: any) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/${user.id}`,
      lastModified: user.updatedAt || user.createdAt,
    }));

    return [...postEntries, ...userEntries];

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
}
