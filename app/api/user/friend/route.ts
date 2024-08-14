import { addFriend } from '@/lib/actions/user.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId, friendId, path, isFriend, isChat } = await req.json();

    const result = await addFriend({ userId, friendId, path, isFriend, isChat });
    return NextResponse.json(result, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ error: 'Failed to update friendship status', message: error.message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Adjust based on your needs
  },
};
