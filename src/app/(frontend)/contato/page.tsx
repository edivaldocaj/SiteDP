import Image from 'next/image'
import React from 'react'

import { FraudWarning } from '@/components/FraudWarning'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

export default function ContactPage() {
  return (
    <div className="site-shell contact-page">
      <section className="band light-band" aria-labelledby="contact-title">
        <div className="section-inner split">
          <div>
            <p className="eyebrow">Contato</p>
            <h1 id="contact-title">Vamos conversar sobre o seu direito?</h1>
          </div>
          <div className="contact-panel">
            <Image alt="" height={76} src="/marca/dp-simbolo.png" unoptimized width={76} />
            <a className="button button-primary" href="/ir/whatsapp?o=contato">
              <WhatsAppIcon />
              Abrir WhatsApp
            </a>
            <FraudWarning />
          </div>
        </div>
      </section>
    </div>
  )
}
