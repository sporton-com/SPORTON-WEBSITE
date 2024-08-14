import { reactToPost } from '@/lib/actions/post.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { postId, userId, react, path } = await req.json();

    await reactToPost({ postId, userId, react, path });

    return NextResponse.json({ message: 'Reaction updated successfully' }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: 'Failed to update reaction', error: error.message }, { status: 500 });
  }
}


