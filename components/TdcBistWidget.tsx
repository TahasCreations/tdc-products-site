'use client'
import { useEffect, useState } from 'react'

type Item = { date: string; price: number; source: string }

export default function TdcBistWidget(){
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => {
    fetch('/api/tdc-bist/recent').then(r=>r.json()).then(d=>setItems(d.items||[])).catch(()=>{})
  }, [])
  const last = items[items.length-1]
  return (
    <div>
      <div style={{fontSize: 32, color: 'var(--color-accent)', marginBottom: 8}}>{last ? `₺${last.price}` : '—'}</div>
      <div className="muted" style={{marginBottom: 12}}>{last ? new Date(last.date).toLocaleDateString('tr-TR') : ''}</div>
      <div className="muted" style={{fontSize: 12}}>Son 30/90 günlük veriler örnektir.</div>
    </div>
  )
}


