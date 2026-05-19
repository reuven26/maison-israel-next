import { ReactNode } from 'react'

/**
 * Minimal markdown → JSX renderer for journal articles.
 * Supports: # H1, ## H2, ### H3, **bold**, *italic*, [link](url),
 *           paragraphs, line breaks.
 *
 * Designed for editorial content where we control the input —
 * not for arbitrary user-generated markdown.
 */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // Combined regex: bold, italic, links
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+?)\]\(([^)]+?)\)/g

  let lastIndex = 0
  let match: RegExpExecArray | null
  let idx = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const key = `${keyPrefix}-${idx++}`
    if (match[1]) {
      // **bold**
      nodes.push(<strong key={key} style={{ color: '#FAFAF9', fontWeight: 600 }}>{match[1]}</strong>)
    } else if (match[2]) {
      // *italic*
      nodes.push(<em key={key}>{match[2]}</em>)
    } else if (match[3] && match[4]) {
      // [text](url)
      const href = match[4]
      const isExternal = href.startsWith('http')
      nodes.push(
        <a
          key={key}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          style={{ color: '#C8A96E', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: 'rgba(200,169,110,0.4)' }}
        >
          {match[3]}
        </a>
      )
    }
    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

export function renderMarkdown(md: string): ReactNode {
  const lines = md.split('\n')
  const blocks: ReactNode[] = []
  let paragraphBuffer: string[] = []
  let blockKey = 0

  function flushParagraph() {
    if (paragraphBuffer.length === 0) return
    const text = paragraphBuffer.join(' ').trim()
    if (text) {
      blocks.push(
        <p key={`p-${blockKey++}`} style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: '#D4D5D8',
          lineHeight: 1.85,
          fontSize: '1.02rem',
          marginBottom: '1.4rem',
        }}>
          {renderInline(text, `p${blockKey}`)}
        </p>
      )
    }
    paragraphBuffer = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushParagraph()
      continue
    }
    if (line.startsWith('### ')) {
      flushParagraph()
      blocks.push(
        <h3 key={`h-${blockKey++}`} style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: '#FAFAF9',
          fontSize: '1.4rem',
          fontWeight: 400,
          marginTop: '2.4rem',
          marginBottom: '0.8rem',
          letterSpacing: '0.01em',
        }}>
          {renderInline(line.slice(4), `h${blockKey}`)}
        </h3>
      )
    } else if (line.startsWith('## ')) {
      flushParagraph()
      blocks.push(
        <h2 key={`h-${blockKey++}`} style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: '#FAFAF9',
          fontSize: '1.85rem',
          fontWeight: 300,
          marginTop: '3rem',
          marginBottom: '1rem',
          letterSpacing: '0.005em',
        }}>
          {renderInline(line.slice(3), `h${blockKey}`)}
        </h2>
      )
    } else if (line.startsWith('# ')) {
      flushParagraph()
      blocks.push(
        <h1 key={`h-${blockKey++}`} style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: '#FAFAF9',
          fontSize: '2.5rem',
          fontWeight: 300,
          marginTop: '2rem',
          marginBottom: '1.2rem',
        }}>
          {renderInline(line.slice(2), `h${blockKey}`)}
        </h1>
      )
    } else if (line.startsWith('- ')) {
      // List item — gather consecutive list items
      flushParagraph()
      const items: string[] = [line.slice(2)]
      // peek-ahead handled via outer loop state — simpler: render single item, group later
      blocks.push(
        <li key={`li-${blockKey++}`} style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: '#D4D5D8',
          lineHeight: 1.75,
          fontSize: '1rem',
          marginBottom: '0.5rem',
          paddingLeft: '0.5rem',
          listStyle: 'none',
          position: 'relative',
        }}>
          <span style={{ color: '#C8A96E', position: 'absolute', left: '-1.2rem' }}>✦</span>
          {renderInline(line.slice(2), `li${blockKey}`)}
        </li>
      )
    } else {
      paragraphBuffer.push(line)
    }
  }
  flushParagraph()

  return <>{blocks}</>
}
