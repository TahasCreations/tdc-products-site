import React from 'react'

export default function Footer() {
  return (
    <footer aria-label="Site Footer">
      <div className="container" style={{display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between'}}>
        <p className="muted" style={{margin: 0}}>© {new Date().getFullYear()} TDC Products. Tüm hakları saklıdır.</p>
        <div style={{display: 'flex', gap: 16}}>
          <a href="/sitemap.xml">Site Haritası</a>
          <a href="/robots.txt">Robots</a>
          <a href="/privacy">Gizlilik</a>
          <a href="/terms">Şartlar</a>
        </div>
      </div>
    </footer>
  )
}