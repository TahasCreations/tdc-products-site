import { sanityClient } from '@/lib/sanity.client'
import { BLOG_DETAIL } from '@/lib/sanity.queries'

export default async function BlogDetailPage({params}: {params: {slug: string}}) {
  const post = await sanityClient.fetch(BLOG_DETAIL, {slug: params.slug})
  return (
    <div className="section">
      <h1 style={{marginBottom: 16}}>{post?.title || params.slug}</h1>
      <article className="card" style={{padding: 16, minHeight: 400}}>
        {post?.excerpt && <p className="muted">{post.excerpt}</p>}
        <div style={{marginTop: 16}}>Zengin içerik (PortableText render eklenebilir)</div>
      </article>
    </div>
  )
}


