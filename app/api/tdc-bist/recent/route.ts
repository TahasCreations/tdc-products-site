import { NextResponse } from 'next/server'
import { getAnonSupabase } from '@/lib/supabase.server'

export async function GET() {
  const supabase = getAnonSupabase()
  if (!supabase) return NextResponse.json({ items: [] })
  const { data, error } = await supabase
    .from('bist_prices')
    .select('date, price, source')
    .order('date', { ascending: false })
    .limit(90)
  if (error) return NextResponse.json({ items: [], error: error.message }, { status: 500 })
  return NextResponse.json({ items: data?.reverse() || [] })
}


