import { fetchUserPosts } from '@/lib/actions/user.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const posts = await fetchUserPosts(id);

    if (posts) {
      return NextResponse.json(posts, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Posts not found' }, { status: 404 });
    }
  } catch (error:any) {
    return NextResponse.json({ error: 'Failed to fetch user posts', message: error.message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Adjust based on your needs
  },
};
