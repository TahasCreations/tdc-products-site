import { NextRequest, NextResponse } from 'next/server'
import dayjs from 'dayjs'
import { getServiceSupabase } from '@/lib/supabase.server'

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.TDC_BIST_CRON_SECRET) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  }
  const supabase = getServiceSupabase()
  if (!supabase) {
    return NextResponse.json({ ok: false, message: 'supabase not configured' }, { status: 500 })
  }
  const { data: last, error: lastErr } = await supabase
    .from('bist_prices')
    .select('*')
    .order('date', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (lastErr) return NextResponse.json({ ok: false, error: lastErr.message }, { status: 500 })
  const lastPrice = last?.price ?? 100
  const r = clamp((Math.random() * 0.06) - 0.03, -0.03, 0.03)
  const nextPrice = Math.round(lastPrice * (1 + r) * 100) / 100
  const today = dayjs().startOf('day').toISOString()

  const { error: upErr } = await supabase.from('bist_prices').insert({ date: today, price: nextPrice, source: 'sim' })
  if (upErr) return NextResponse.json({ ok: false, error: upErr.message }, { status: 500 })
  return NextResponse.json({ ok: true, last: lastPrice, next: nextPrice, r })
}


