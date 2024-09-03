import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export default async function enhancedMiddleware(req: NextRequest, event: NextFetchEvent) {
  // Call Clerk middleware and await the response
  const res = await clerkMiddleware({})(req, event);

  // Check if res is null or undefined
  if (!res) {
    return NextResponse.next(); // أو يمكنك إرجاع استجابة أخرى إذا كانت فارغة
  }

  // Apply Security Headers
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';");

  // Force HTTPS
  if (req.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(`https://${req.headers.get('host')}${req.nextUrl.pathname}`, 301);
  }

  return res;
}

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
