import dynamic from 'next/dynamic'
const TdcBistWidget = dynamic(() => import('@/components/TdcBistWidget'), { ssr: false })

export default function TdcBistPage() {
  return (
    <div className="section">
      <div className="card" style={{padding: 16, marginBottom: 16}}>
        <strong>Uyarı:</strong> Bu sayfadaki tüm veriler tamamen kurgusaldır.
      </div>
      <div className="grid">
        <div style={{gridColumn: 'span 9'}}>
          <div className="card" style={{height: 320, padding: 16}}>30/90 Günlük Grafik (placeholder)</div>
          <div className="card" style={{marginTop: 16, padding: 16}}>Tablo (placeholder)</div>
        </div>
        <aside style={{gridColumn: 'span 3'}}>
          <div className="card" style={{padding: 16, position: 'sticky', top: 16}}>
            <div aria-live="polite" style={{fontSize: 24, color: 'var(--color-accent)'}}>TDC BIST</div>
            <p className="muted">Güncel fiyat ve özet</p>
            <TdcBistWidget />
          </div>
        </aside>
      </div>
    </div>
  )
}