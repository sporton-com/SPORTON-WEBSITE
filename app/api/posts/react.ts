import { reactToPost } from '@/lib/actions/post.actions';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { postId, userId, react, path } = req.body;

    await reactToPost({ postId, userId, react, path });

    res.status(200).json({ message: 'Reaction updated successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
