import Image from 'next/image'
import React from 'react'

import { FraudWarning } from './FraudWarning'

export async function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <Image
          alt="Marca do escritorio"
          height={54}
          src="/marca/dp-horizontal-claro.png"
          unoptimized
          width={240}
        />
        <p>Publicidade advocaticia informativa.</p>
      </div>
      <FraudWarning className="footer-warning" />
    </footer>
  )
}
