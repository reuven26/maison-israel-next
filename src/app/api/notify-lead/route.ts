import { NextResponse } from 'next/server'

// Envoie une notification WhatsApp à l'admin lors d'un nouveau lead, via Twilio.
//
// Config (Vercel → Environment Variables) :
//   TWILIO_ACCOUNT_SID    — SID du compte Twilio (commence par AC...)
//   TWILIO_AUTH_TOKEN     — Auth Token du compte Twilio
//   TWILIO_WHATSAPP_FROM  — numéro WhatsApp Twilio, ex: "whatsapp:+14155238886" (sandbox) ou ton numéro validé
//   ADMIN_WHATSAPP_TO     — ton numéro qui reçoit l'alerte, ex: "whatsapp:+972555002640"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const nom = String(body.nom || '').slice(0, 200)
    const email = String(body.email || '').slice(0, 200)
    const telephone = String(body.telephone || '').slice(0, 60)
    const message = String(body.message || '').slice(0, 500)
    const source = String(body.source || '').slice(0, 60)

    const sid = process.env.TWILIO_ACCOUNT_SID
    const token = process.env.TWILIO_AUTH_TOKEN
    const from = process.env.TWILIO_WHATSAPP_FROM
    const to = process.env.ADMIN_WHATSAPP_TO

    if (!sid || !token || !from || !to) {
      // Pas configuré — on ne bloque jamais le formulaire
      return NextResponse.json({ ok: true, whatsapp: 'not_configured' })
    }

    const lines = [
      '🏠 *Nouveau lead — Maison Israël*',
      '',
      `👤 ${nom}`,
    ]
    if (telephone) lines.push(`📱 ${telephone}`)
    if (email) lines.push(`✉️ ${email}`)
    if (source) lines.push(`🌐 Source: ${source}`)
    if (message) lines.push(`💬 ${message}`)

    // Normalise les préfixes "whatsapp:" (tolère si l'utilisateur a juste mis le numéro)
    const fromAddr = from.startsWith('whatsapp:') ? from : `whatsapp:${from}`
    const toAddr = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`

    const params = new URLSearchParams()
    params.set('From', fromAddr)
    params.set('To', toAddr)
    params.set('Body', lines.join('\n'))

    const auth = Buffer.from(`${sid}:${token}`).toString('base64')
    const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!r.ok) {
      const errText = await r.text()
      console.error('Twilio error:', r.status, errText)
      return NextResponse.json({ ok: true, whatsapp: 'failed' })
    }

    return NextResponse.json({ ok: true, whatsapp: 'sent' })
  } catch (err) {
    console.error('notify-lead error:', err)
    // Ne jamais bloquer l'UX du formulaire
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
