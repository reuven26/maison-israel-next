import ArticleForm from '@/components/admin/ArticleForm'

export default function NewArticlePage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff', marginBottom: '0.3rem' }}>Nouvel article</h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Créer un article pour le blog</p>
      <ArticleForm />
    </div>
  )
}
