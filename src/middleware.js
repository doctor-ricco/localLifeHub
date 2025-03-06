import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // Se não estiver autenticado
  if (!token) {
    if (req.nextUrl.pathname !== '/signin' && req.nextUrl.pathname !== '/register') {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    return NextResponse.next();
  }

  // Se estiver tentando acessar signin ou register quando já está autenticado
  if (req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/register') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Se estiver tentando acessar complete-profile
  if (req.nextUrl.pathname === '/complete-profile') {
    try {
      const profileResponse = await fetch(`${req.nextUrl.origin}/api/user/profile`, {
        headers: {
          Cookie: req.headers.get('cookie'),
        },
      });
      const profileData = await profileResponse.json();

      const isProfileComplete = profileData.user && (
        profileData.user.phone ||
        profileData.user.address ||
        profileData.user.city ||
        (profileData.user.interests && profileData.user.interests.length > 0) ||
        profileData.user.bio
      );

      if (isProfileComplete) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    } catch (error) {
      console.error('Error checking profile:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signin',
    '/register',
    '/complete-profile',
    '/dashboard',
    '/profile/:path*'
  ]
}; 