import React from 'react'
import { sanityClient } from '@/lib/sanity.client'
import { CATEGORY_LIST, FEATURED_PRODUCTS } from '@/lib/sanity.queries'
import ProductCard from '@/components/ProductCard'

export default async function Page() {
  const [categories, featured] = await Promise.all([
    sanityClient.fetch(CATEGORY_LIST),
    sanityClient.fetch(FEATURED_PRODUCTS),
  ])
  return (
    <div>
      <section className="hero">
        <div className="grid" style={{alignItems: 'center'}}>
          <div style={{gridColumn: 'span 7'}}>
            <h1 style={{fontSize: 44, marginBottom: 16}}>Modern, ferah ve hızlı 3D ürünler</h1>
            <p className="muted" style={{fontSize: 18, marginBottom: 24}}>Anime, Oyun ve Film temalı koleksiyonlar. Şık ve sade bir deneyim.</p>
            <div style={{display: 'flex', gap: 12}}>
              <a className="btn btn-primary" href="/products">Ürünlere Göz At</a>
              <a className="btn" href="/tdc-bist" aria-label="TDC BIST">TDC BIST</a>
            </div>
          </div>
          <div style={{gridColumn: 'span 5'}}>
            <div className="card" style={{height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Görsel/3D Örnek</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{marginBottom: 24}}>Kategoriler</h2>
        <div className="grid">
          {categories?.slice(0,3).map((c: any) => (
            <a key={c._id} className="card" style={{gridColumn: 'span 4', padding: 24}} href={`/products?category=${c.slug?.current}`}>{c.title}</a>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 style={{marginBottom: 24}}>Öne Çıkanlar</h2>
        <div className="grid">
          {featured?.slice(0,4).map((p: any) => (
            <div key={p._id} style={{gridColumn: 'span 3'}}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}