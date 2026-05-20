import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/*?utm_*',
          '/*?fbclid=*',
          '/*?gclid=*',
        ],
      },
      {
        userAgent: 'Bingbot',
        crawlDelay: 1,
      },
      {
        userAgent: 'YandexBot',
        crawlDelay: 5,
      },
    ],
    sitemap: 'https://immobilierenisrael.com/sitemap.xml',
    host: 'https://immobilierenisrael.com',
  }
}
