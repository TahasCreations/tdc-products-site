'use client'
import Link from 'next/link'
import Image from 'next/image'
import {urlForImage} from '@/lib/image'
import { useState } from 'react'
import ProductQuickView from './ProductQuickView'

type VariantPreview = {price?: number}

export default function ProductCard({
  product,
}: {
  product: { _id: string; title: string; slug?: { current: string }; images?: any[]; variants?: VariantPreview[] }
}) {
  const [open, setOpen] = useState(false)
  const href = `/products/${product.slug?.current || product._id}`
  const imgSrc = product.images?.[0] ? urlForImage(product.images[0]).width(800).height(600).url() : undefined
  const price = product.variants?.[0]?.price
  return (
    <div className="card" style={{display: 'block', padding: 12}}>
      <button onClick={()=>setOpen(true)} aria-label={`${product.title} hızlı görünüm`} style={{all: 'unset', cursor: 'pointer', display: 'block'}}>
        <div style={{position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 10, marginBottom: 12, background: '#f5f5f5'}}>
          {imgSrc ? (
            <Image src={imgSrc} alt={product.title} fill sizes="(min-width: 1024px) 25vw, 50vw" style={{objectFit: 'cover'}} />
          ) : (
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}} aria-hidden>
              Görsel yok
            </div>
          )}
        </div>
      </button>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Link href={href}>{product.title}</Link>
        {price !== undefined && <span className="muted">₺{price}</span>}
      </div>
      <ProductQuickView slug={product.slug?.current} open={open} onClose={()=>setOpen(false)} />
    </div>
  )
}


