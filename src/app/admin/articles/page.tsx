import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteArticleButton from '@/components/admin/DeleteArticleButton'

export default async function AdminArticles() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff' }}>Articles</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            {articles?.length ?? 0} articles · {articles?.filter((a: any) => a.statut === 'publie').length ?? 0} publiés
          </p>
        </div>
        <Link href="/admin/articles/new" style={{
          background: '#C8A96E', color: '#0A0A0B',
          padding: '0.7rem 1.5rem',
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          textDecoration: 'none', fontWeight: 600,
        }}>
          + Nouvel article
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {articles && articles.length > 0 ? articles.map((article: any) => (
          <div key={article.id} style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
              {article.image && (
                <img src={article.image} alt={article.titre} style={{ width: '80px', height: '55px', objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{
                    fontSize: '0.65rem', padding: '0.2rem 0.6rem',
                    background: article.statut === 'publie' ? 'rgba(34,197,94,0.2)' : 'rgba(107,114,128,0.2)',
                    color: article.statut === 'publie' ? '#4ADE80' : '#9CA3AF',
                  }}>
                    {article.statut === 'publie' ? 'Publié' : 'Brouillon'}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#C8A96E' }}>{article.categorie}</span>
                </div>
                <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 500, marginBottom: '0.2rem' }}>{article.titre}</h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                  Par {article.auteur} · {new Date(article.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
              <Link href={`/admin/articles/${article.id}`} style={{ fontSize: '0.8rem', color: '#C8A96E', textDecoration: 'none' }}>Modifier</Link>
              <DeleteArticleButton id={article.id} titre={article.titre} />
            </div>
          </div>
        )) : (
          <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
            Aucun article. <Link href="/admin/articles/new" style={{ color: '#C8A96E' }}>Créer le premier</Link>
          </div>
        )}
      </div>
    </div>
  )
}
