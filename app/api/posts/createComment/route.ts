import { createCommentToPost } from '@/lib/actions/post.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { postId, commentText, userId, path } = await req.json();

    await createCommentToPost({ postId, commentText, userId, path });

    return NextResponse.json({ message: 'Comment added successfully' }, { status: 201 });
  } catch (error:any) {
    return NextResponse.json({ message: 'Failed to add comment', error: error.message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Adjust depending on your needs
  },
};
