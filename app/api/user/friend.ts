import { addFriend } from '@/lib/actions/user.actions';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, friendId, path, isFriend, isChat } = req.body;
    try {
      const result = await addFriend({ userId, friendId, path, isFriend, isChat });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update friendship status' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
