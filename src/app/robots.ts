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
      // ── AI / LLM crawlers — explicitly welcomed (GEO) ──────────
      // Allowing these = eligibility to be cited by AI assistants.
      { userAgent: 'GPTBot', allow: '/' },             // OpenAI training
      { userAgent: 'OAI-SearchBot', allow: '/' },      // ChatGPT search
      { userAgent: 'ChatGPT-User', allow: '/' },       // ChatGPT browsing
      { userAgent: 'ClaudeBot', allow: '/' },          // Anthropic
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },      // Perplexity index
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },    // Gemini / AI Overviews
      { userAgent: 'Applebot-Extended', allow: '/' },  // Apple Intelligence
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
    ],
    sitemap: 'https://immobilierenisrael.com/sitemap.xml',
    host: 'https://immobilierenisrael.com',
  }
}
