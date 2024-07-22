import { createCommentToPost } from '@/lib/actions/post.actions';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { postId, commentText, userId, path } = req.body;

    await createCommentToPost({ postId, commentText, userId, path });

    res.status(201).json({ message: 'Comment added successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
