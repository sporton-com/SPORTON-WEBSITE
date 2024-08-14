import { fetchUser } from '@/lib/actions/user.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');


  try {
    const user = await fetchUser(id&&id!=="1"?id:undefined);

    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error:any) {
    return NextResponse.json({ error: 'Failed to fetch user', message: error.message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Adjust depending on your needs
  },
};
