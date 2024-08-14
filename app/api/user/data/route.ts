// // /api/user/data
// import { fetchUser } from '@/lib/actions/user.actions';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {



//   try {
//     const user = await fetchUser();

//     if (user) {
//       return NextResponse.json(user, { status: 200 });
//     } else {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }
//   } catch (error:any) {
//     return NextResponse.json({ error: 'Failed to fetch user', message: error.message }, { status: 500 });
//   }
// }


