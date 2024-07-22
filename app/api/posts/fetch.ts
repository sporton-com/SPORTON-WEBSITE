import { fetchPosts } from '@/lib/actions/post.actions';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { pageNum, pageSize } = req.query;

    const result = await fetchPosts(Number(pageNum) || 0, Number(pageSize) || 20);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ message: 'Failed to fetch posts' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
