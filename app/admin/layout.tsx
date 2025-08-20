export const metadata = { title: 'Yönetim' }

export default function AdminLayout({children}: {children: React.ReactNode}) {
  // Not: Burada Supabase session/role kontrolü eklenecek (sunucu tarafında).
  return <>{children}</>
}


