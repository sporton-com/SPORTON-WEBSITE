import { MetadataRoute } from 'next';
import { fetchPostsSiteMap } from '@/lib/actions/post.actions';
import { fetchUsers } from '@/lib/actions/user.actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await fetchPostsSiteMap();
    const users = await fetchUsers();

    if (!Array.isArray(posts)) {
      console.error('Posts data is not an array:', posts);
      return [];
    }

    if (!Array.isArray(users)) {
      console.error('Users data is not an array:', users);
      return [];
    }

    const postEntries = posts.map((post: any) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post._id}`,
      lastModified: post.updatedAt || post.createdAt,
    }));

    const userEntries = users.map((user: any) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/${user._id}`,
      lastModified: user.updatedAt || user.createdAt,
    }));

    return [...postEntries, ...userEntries,
      {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/activity`,
      lastModified: new Date(),
    },
      {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/search`,
      lastModified: new Date(),
    },
      {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/new-post`,
      lastModified: new Date(),
    },
      {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/store`,
      lastModified: new Date(),
    },
      {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
      lastModified: new Date(),
    },
      {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
      lastModified: new Date(),
    },
      {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/messaging`,
      lastModified: new Date(),
    },
  ];

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
}
