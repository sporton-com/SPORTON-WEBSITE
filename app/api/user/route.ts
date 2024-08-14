import { fetchAllUser } from '@/lib/actions/user.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  const searchString = searchParams.get('searchString') || '';
  const pageNum = parseInt(searchParams.get('pageNum') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

  try {
    const users = await fetchAllUser({
      searchString,
      pageNum,
      pageSize,
    });

    return NextResponse.json({ users: users?.users, isNext: users?.isNext }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Adjust depending on your needs
  },
};
