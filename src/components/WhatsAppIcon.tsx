import React from 'react'

export function WhatsAppIcon({ className = 'whatsapp-icon' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.6 19.4 5.8 16A7.6 7.6 0 1 1 8 18.2l-3.4 1.2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M9.1 8.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.4.5c-.1.2-.1.3 0 .5.4.8 1.2 1.6 2.1 2.1.2.1.3.1.5 0l.6-.5c.2-.2.4-.2.7-.1l1.5.7c.3.1.4.3.4.6 0 .4-.2 1.1-.7 1.4-.5.4-1.6.5-3.1-.2-2.5-1.1-4.4-3-5.3-5.3-.5-1.2-.2-1.9.1-2.3.2-.3.5-.5.8-.6Z"
        fill="currentColor"
      />
    </svg>
  )
}
