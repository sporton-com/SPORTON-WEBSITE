// pages/api/sitemap.xml.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPosts } from '@/lib/actions/post.actions';
import { fetchAllUser } from '@/lib/actions/user.actions';

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency?: string;
  priority?: number;
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await fetchPosts(1, 100);
  const users = await fetchAllUser({ searchString: '', pageNum: 1, pageSize: 100 });

  if (!posts || !users) {
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(`
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://www.sporton.website/about</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      </urlset>
    `);
    return;
  }

  const postEntries: SitemapEntry[] = posts.posts.map((post) => ({
    url: `https://www.sporton.website/posts/${post._id}`,
    lastModified: new Date(post.createdAt).toISOString(),
    changeFrequency: 'daily',
    priority: 1,
  }));

  const userEntries: SitemapEntry[] = users.users.map((user) => ({
    url: `https://www.sporton.website/profile/${user.id}`,
    lastModified: new Date(user.updatedAt).toISOString(),
    changeFrequency: 'daily',
    priority: 1,
  }));

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[
        {
          url: 'https://www.sporton.website/about',
          lastModified: new Date().toISOString(),
        },
        ...postEntries,
        ...userEntries,
      ]
        .map(
          (entry) => `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
          ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
        </url>`
        )
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
