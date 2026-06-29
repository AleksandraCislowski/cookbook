import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname === '/_next/image' ||
    request.nextUrl.pathname === '/image-optimization-disabled'
  ) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/_next/image', '/image-optimization-disabled'],
};
