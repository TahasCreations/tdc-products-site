import React from 'react'
import { sanityClient } from '@/lib/sanity.client'
import { PRODUCT_LIST } from '@/lib/sanity.queries'
import ProductCard from '@/components/ProductCard'

export default async function ProductsPage() {
  const products = await sanityClient.fetch(PRODUCT_LIST)
  return (
    <div className="section">
      <h1 style={{marginBottom: 16}}>Ürünler</h1>
      <div className="grid" style={{marginBottom: 16, alignItems: 'end'}}>
        <div style={{gridColumn: 'span 3'}}>
          <label className="muted" htmlFor="search">Arama</label>
          <input id="search" placeholder="Ürün, etiket..." style={{width: '100%', height: 44, borderRadius: 10, border: '1px solid var(--color-border)', padding: '0 12px'}} />
        </div>
        <div style={{gridColumn: 'span 3'}}>
          <label className="muted" htmlFor="category">Kategori</label>
          <select id="category" style={{width: '100%', height: 44, borderRadius: 10, border: '1px solid var(--color-border)', padding: '0 12px'}}>
            <option>Hepsi</option>
            <option>Anime</option>
            <option>Oyun</option>
            <option>Film</option>
          </select>
        </div>
        <div style={{gridColumn: 'span 3'}}>
          <label className="muted" htmlFor="sort">Sıralama</label>
          <select id="sort" style={{width: '100%', height: 44, borderRadius: 10, border: '1px solid var(--color-border)', padding: '0 12px'}}>
            <option>En yeni</option>
            <option>Fiyat (Artan)</option>
            <option>Fiyat (Azalan)</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {products?.map((p: any) => (
          <div key={p._id} style={{gridColumn: 'span 3'}}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}