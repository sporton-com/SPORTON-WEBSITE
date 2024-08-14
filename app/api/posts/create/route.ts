import { createPost } from '@/lib/actions/post.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text, image, video, author, isAchievement } = await req.json();

    const success = await createPost({ text, image, video, author, isAchievement });

    if (success) {
      return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Failed to create post' }, { status: 500 });
    }
  } catch (error:any) {
    return NextResponse.json({ message: 'Failed to create post', error: error.message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Adjust depending on your needs
  },
};
