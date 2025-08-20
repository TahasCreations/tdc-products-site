import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.client'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: any) {
  try {
    return builder.image(source)
  } catch {
    return builder.image('')
  }
}


