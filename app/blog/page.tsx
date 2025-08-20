import { sanityClient } from '@/lib/sanity.client'
import { BLOG_LIST } from '@/lib/sanity.queries'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await sanityClient.fetch(BLOG_LIST)
  return (
    <div className="section">
      <h1 style={{marginBottom: 16}}>Blog</h1>
      <div className="grid">
        {posts?.map((post: any) => (
          <article key={post._id} className="card" style={{gridColumn: 'span 4', padding: 16, minHeight: 200}}>
            <h3 style={{marginTop: 0}}>{post.title}</h3>
            {post._type === 'blogPost' && (
              <Link className="btn" href={`/blog/${post.slug?.current}`}>Oku</Link>
            )}
            {post._type === 'linkPost' && (
              <a className="btn" href={post.targetUrl} target="_blank" rel="noopener noreferrer">Kaynağa Git</a>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
