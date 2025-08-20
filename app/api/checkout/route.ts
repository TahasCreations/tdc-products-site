import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase.server'

export async function POST(req: NextRequest) {
  const supabase = getServiceSupabase()
  if (!supabase) return NextResponse.json({ ok: false, message: 'supabase not configured' }, { status: 500 })
  // Accept JSON or form submissions
  let body: any = await req.json().catch(() => null)
  if (!body) {
    const form = await req.formData().catch(() => null)
    if (form) {
      try {
        const payload = form.get('payload') as string
        body = JSON.parse(payload)
      } catch {
        body = null
      }
    }
  }
  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ ok: false, message: 'invalid payload' }, { status: 400 })
  }
  const currency = body.currency || 'TRY'
  const total = body.items.reduce((s: number, it: any) => s + (Number(it.unit_price) * Number(it.qty || 1)), 0)
  const { data: order, error: orderErr } = await supabase.from('orders').insert({ user_id: body.user_id || null, status: 'pending', total, currency }).select('*').single()
  if (orderErr) return NextResponse.json({ ok: false, error: orderErr.message }, { status: 500 })
  const items = body.items.map((it: any) => ({ order_id: order.id, product_slug: it.product_slug, variant_key: it.variant_key || null, qty: it.qty || 1, unit_price: it.unit_price }))
  const { error: itemsErr } = await supabase.from('order_items').insert(items)
  if (itemsErr) return NextResponse.json({ ok: false, error: itemsErr.message }, { status: 500 })
  return NextResponse.json({ ok: true, order_id: order.id, total, currency })
}


