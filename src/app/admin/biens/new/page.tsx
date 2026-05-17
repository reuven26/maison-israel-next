import BienForm from '@/components/admin/BienForm'

export default function NewBienPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff', marginBottom: '0.3rem' }}>
        Nouveau bien
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Ajouter une nouvelle propriété au portefeuille</p>
      <BienForm />
    </div>
  )
}
