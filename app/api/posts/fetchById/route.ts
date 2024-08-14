import { fetchPostById } from '@/lib/actions/post.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
    }

    const post = await fetchPostById(id);

    if (post) {
      return NextResponse.json(post, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
  } catch (error:any) {
    return NextResponse.json({ message: 'Failed to fetch post', error: error.message }, { status: 500 });
  }
}


