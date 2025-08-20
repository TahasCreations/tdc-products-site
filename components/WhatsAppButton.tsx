import React from 'react'

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+905558988242'
  const message = encodeURIComponent('Merhaba, TDC Products hakkında bilgi almak istiyorum.')
  const href = `https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`

  return (
    <div className="whatsapp">
      <a aria-label="WhatsApp ile iletişime geç" className="btn btn-primary" href={href} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
    </div>
  )
}