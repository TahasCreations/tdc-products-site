import { sanityClient } from '@/lib/sanity.client'
import { PRODUCT_DETAIL } from '@/lib/sanity.queries'
import Image from 'next/image'
import { urlForImage } from '@/lib/image'

export default async function ProductDetailPage({params}: {params: {slug: string}}) {
  const product = await sanityClient.fetch(PRODUCT_DETAIL, {slug: params.slug})
  return (
    <div className="section">
      <h1 style={{marginBottom: 16}}>{product?.title || params.slug}</h1>
      <div className="grid">
        <div style={{gridColumn: 'span 6'}}>
          <div className="card" style={{padding: 16}}>
            {product?.images?.[0] ? (
              <div style={{position: 'relative', width: '100%', aspectRatio: '4/3'}}>
                <Image src={urlForImage(product.images[0]).width(1200).height(900).url()} alt={product.title} fill sizes="(min-width: 1024px) 50vw, 100vw" style={{objectFit: 'cover'}} />
              </div>
            ) : (
              <div style={{height: 420}}>Görsel</div>
            )}
          </div>
          {product?.model3d && (
            <div className="card" style={{marginTop: 16, padding: 16}}>
              <model-viewer src={product.model3d} ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="aces" shadow-intensity="1"></model-viewer>
            </div>
          )}
        </div>
        <div style={{gridColumn: 'span 6'}}>
          <div className="card" style={{padding: 16}}>
            <h3>Özellikler</h3>
            <p><strong>Materyaller:</strong> {product?.materials || '-'}</p>
            <p><strong>Boya:</strong> {product?.paints || '-'}</p>
            <p><strong>Ölçüler:</strong> {product?.dimensions || '-'}</p>
            <p><strong>Kargo:</strong> {product?.shipping || '-'}</p>
            <div style={{marginTop: 16}}>
              <h4>Varyantlar</h4>
              <ul>
                {product?.variants?.map((v: any, i: number) => (
                  <li key={i} className="muted">{v.size} cm • {v.coating || 'Kaplama yok'} • {v.stand || 'Stand yok'} • ₺{v.price}</li>
                ))}
              </ul>
            </div>
            <form action="/api/checkout" method="post" style={{marginTop: 16}}>
              <input type="hidden" name="payload" value="mock" />
              <button className="btn btn-primary" type="submit">Sepete Ekle (Mock)</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


