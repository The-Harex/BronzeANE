import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/admin/login';
  
  const session = request.cookies.get('admin_session')?.value;
 
  // If trying to access admin pages (excluding login) and no session
  if (path.startsWith('/admin') && !isLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
 
  // If trying to access login page AND has session
  if (isLoginPage && session === 'authenticated') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
 
  return NextResponse.next();
}
 
export const config = {
  matcher: '/admin/:path*',
}