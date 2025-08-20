import groq from 'groq'

export const CATEGORY_LIST = groq`*[_type == "category"] | order(order asc, title asc){
  _id, title, slug, description, image
}`

export const FEATURED_PRODUCTS = groq`*[_type == "product" && featured == true][0...8]{
  _id, title, slug, images, model3d, variants[0]{price}
}`

export const PRODUCT_LIST = groq`*[_type == "product"] | order(_createdAt desc){
  _id, title, slug, images, variants[0]{price}
}`

export const PRODUCT_DETAIL = groq`*[_type == "product" && slug.current == $slug][0]{
  _id, title, slug, description, images, model3d, materials, paints, dimensions, shipping,
  variants[]{size, coating, stand, sku, price, stock},
  category->{_id, title, slug}
}`

export const BLOG_LIST = groq`*[_type in ["blogPost","linkPost"]] | order(publishedAt desc)[0...20]{
  _type, _id, title, slug, excerpt, cover, targetUrl, source, publishedAt
}`

export const BLOG_DETAIL = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  _id, title, slug, excerpt, cover, content, tags, publishedAt
}`


