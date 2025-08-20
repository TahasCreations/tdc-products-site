'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { sanityClient } from '@/lib/sanity.client'
import { PRODUCT_DETAIL } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/image'

type Props = { slug?: string; open: boolean; onClose: () => void }

export default function ProductQuickView({ slug, open, onClose }: Props) {
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    if (!open || !slug) return
    let active = true
    sanityClient.fetch(PRODUCT_DETAIL, { slug }).then((d) => { if (active) setData(d) }).catch(()=>{})
    return () => { active = false }
  }, [open, slug])

  if (!open) return null

  return (
    <div role="dialog" aria-modal="true" aria-label="Ürün Hızlı Görünüm" style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60}} onClick={onClose}>
      <div className="card" style={{width: 'min(960px, 92vw)', maxHeight: '80vh', overflow: 'auto', padding: 16}} onClick={(e)=>e.stopPropagation()}>
        <div style={{display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap'}}>
          <div style={{flex: '1 1 360px', position: 'relative', minHeight: 240}}>
            {data?.images?.[0] ? (
              <div style={{position: 'relative', width: '100%', aspectRatio: '4/3'}}>
                <Image src={urlForImage(data.images[0]).width(1200).height(900).url()} alt={data.title} fill sizes="50vw" style={{objectFit: 'cover'}} />
              </div>
            ) : (
              <div style={{height: 240, background: '#f3f4f6'}} />
            )}
          </div>
          <div style={{flex: '1 1 360px'}}>
            <h3 style={{marginTop: 0}}>{data?.title || slug}</h3>
            <p className="muted">{data?.materials || ''}</p>
            <p className="muted">{data?.paints || ''}</p>
            <p className="muted">{data?.dimensions || ''}</p>
            <div style={{marginTop: 8}}>
              {data?.variants?.slice(0,3).map((v: any, i: number) => (
                <div key={i} className="muted">{v.size} cm • {v.coating || 'Kaplama yok'} • {v.stand || 'Stand yok'} • ₺{v.price}</div>
              ))}
            </div>
            <div style={{display: 'flex', gap: 8, marginTop: 16}}>
              <a className="btn btn-primary" href={`/products/${slug}`}>Detaya Git</a>
              <button className="btn" onClick={onClose}>Kapat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


