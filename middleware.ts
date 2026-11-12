import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

function getLocale(request: NextRequest): Locale {
  // Check cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  if (acceptLanguage.includes('he')) return 'he'
  if (acceptLanguage.includes('en')) return 'en'

  return defaultLocale
}

export async function middleware(request: NextRequest) {
  // ── Migration de domaine : immobilierenisrael.com → luxuryisraelrealestate.com ──
  // L'ancien domaine continue de fonctionner mais redirige (308 permanent) vers le
  // nouveau domaine principal, en conservant le chemin et les paramètres.
  const host = (request.headers.get('host') ?? '').toLowerCase()
  if (host === 'immobilierenisrael.com' || host === 'www.immobilierenisrael.com') {
    const url = request.nextUrl.clone()
    url.hostname = 'luxuryisraelrealestate.com'
    url.port = ''
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }

  const { pathname } = request.nextUrl

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/admin')
  ) {
    // Handle admin auth separately
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
      let supabaseResponse = NextResponse.next({ request })
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() { return request.cookies.getAll() },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
              supabaseResponse = NextResponse.next({ request })
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options))
            },
          },
        }
      )
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        const loginUrl = request.nextUrl.clone()
        loginUrl.pathname = '/admin/login'
        return NextResponse.redirect(loginUrl)
      }
      return supabaseResponse
    }
    if (pathname === '/admin/login') {
      let supabaseResponse = NextResponse.next({ request })
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() { return request.cookies.getAll() },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
              supabaseResponse = NextResponse.next({ request })
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options))
            },
          },
        }
      )
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
      }
      return supabaseResponse
    }
    return NextResponse.next()
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname}`
    const response = NextResponse.redirect(url)
    response.cookies.set('NEXT_LOCALE', locale, { maxAge: 60 * 60 * 24 * 365 })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
