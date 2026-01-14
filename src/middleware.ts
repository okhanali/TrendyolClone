import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isAccountPage = request.nextUrl.pathname.startsWith('/account');

  const token = request.cookies.get('firebase-uid')?.value;

  if (isAccountPage && !token) {
    const loginUrl = new URL('/login', request.url);

    loginUrl.searchParams.set('returnUrl', request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*'],
};
