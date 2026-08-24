import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export function GET() {
  const numero = process.env.WHATSAPP_NUMERO

  if (!numero) {
    redirect('/')
  }

  const texto = encodeURIComponent('Vamos conversar sobre o seu direito?')

  redirect(`https://wa.me/${numero}?text=${texto}`)
}
