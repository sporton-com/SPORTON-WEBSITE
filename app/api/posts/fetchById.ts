import { fetchPostById } from '@/lib/actions/post.actions';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    const post = await fetchPostById(id as string);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
