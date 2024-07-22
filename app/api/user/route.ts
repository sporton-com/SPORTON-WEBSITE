
import { fetchAllUser } from '@/lib/actions/user.actions';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { searchString, pageNum, pageSize, sortBy } = req.query;

  try {
    const users = await fetchAllUser({
      searchString: searchString as string,
      pageNum: parseInt(pageNum as string) || 1,
      pageSize: parseInt(pageSize as string) || 20,
      sortBy: sortBy as any || 'desc',
    });
    res.status(200).json({ users:users?.users,isNext: users?.isNext });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
