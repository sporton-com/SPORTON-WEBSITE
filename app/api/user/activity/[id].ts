import { getActivity } from '@/lib/actions/user.actions';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const activity = await getActivity(id as string);
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user activity' });
  }
}
