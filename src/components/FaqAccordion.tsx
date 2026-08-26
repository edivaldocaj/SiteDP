'use client'

import React, { useState } from 'react'

export type FaqItem = {
  answer: string
  question: string
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-button-${index}`

        return (
          <article className="faq-item" key={item.question}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              id={buttonId}
              onClick={() => setOpen(isOpen ? -1 : index)}
              type="button"
            >
              <span>{item.question}</span>
              <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            <div
              aria-labelledby={buttonId}
              hidden={!isOpen}
              id={panelId}
              role="region"
            >
              <p>{item.answer}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
