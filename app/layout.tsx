import './globals.css'
import React from 'react'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata = {
  title: 'TDC Products — Modern 3D Ürünler',
  description: 'Anime, Oyun ve Film temalı 3D ürünler. Modern, hızlı ve erişilebilir e-ticaret deneyimi.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <Script strategy="afterInteractive" type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
        <div className="header">
          <div className="container">
            <Header />
          </div>
        </div>
        <main className="container" role="main">{children}</main>
        <div className="footer">
          <div className="container">
            <Footer />
          </div>
        </div>
        <WhatsAppButton />
      </body>
    </html>
  )
}