// api/post/fetch
import { fetchPosts } from '@/lib/actions/post.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams)
  const pageNum = Number(searchParams.get('pageNum')) || 0;
  const pageSize = Number(searchParams.get('pageSize')) || 20;


  try {
    const result = await fetchPosts(pageNum, pageSize);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
  }
}


