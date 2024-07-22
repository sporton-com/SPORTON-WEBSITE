import { createPost } from '@/lib/actions/post.actions';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text, image, video, author, isAchievement } = req.body;

    const success = await createPost({ text, image, video, author, isAchievement });

    if (success) {
      res.status(201).json({ message: 'Post created successfully' });
    } else {
      res.status(500).json({ message: 'Failed to create post' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
