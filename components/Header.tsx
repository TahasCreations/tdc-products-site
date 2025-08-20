import React from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header aria-label="Site Header" style={{background: 'transparent'}}>
      <nav className="grid" aria-label="Primary">
        <div className="grid" style={{gridTemplateColumns: '2fr 8fr 2fr', alignItems: 'center', padding: '16px 0'}}>
          <div>
            <Link href="/" aria-label="TDC Products Anasayfa">
              <strong>TDC Products</strong>
            </Link>
          </div>
          <ul style={{display: 'flex', gap: '24px', justifyContent: 'center', listStyle: 'none', padding: 0, margin: 0}}>
            <li><Link href="/products">Ürünler</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/about">Hakkımızda</Link></li>
            <li><Link href="/contact">İletişim</Link></li>
            <li style={{marginLeft: '24px'}}><Link href="/tdc-bist" aria-label="TDC BIST" style={{color: 'var(--color-accent)'}}>TDC BIST</Link></li>
          </ul>
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
            <ThemeToggle />
            <Link className="btn" href="/auth">Giriş</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}