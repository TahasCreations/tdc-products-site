const variant = {
  name: 'variant',
  title: 'Varyant',
  type: 'object',
  fields: [
    {name: 'size', title: 'Boyut', type: 'string', options: {list: ['10','15','20','30']}},
    {name: 'coating', title: 'Kaplama', type: 'string'},
    {name: 'stand', title: 'Stand', type: 'string'},
    {name: 'sku', title: 'SKU', type: 'string'},
    {name: 'price', title: 'Baz Fiyat', type: 'number', validation: (Rule: any) => Rule.min(0)},
    {name: 'stock', title: 'Stok', type: 'number'},
  ],
}

export default {
  name: 'product',
  title: 'Ürün',
  type: 'document',
  fields: [
    {name: 'title', title: 'Ad', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}},
    {name: 'category', title: 'Kategori', type: 'reference', to: [{type: 'category'}]},
    {name: 'featured', title: 'Öne Çıkan', type: 'boolean'},
    {name: 'tags', title: 'Etiketler', type: 'array', of: [{type: 'string'}]},
    {name: 'description', title: 'Açıklama', type: 'array', of: [{type: 'block'}]},
    {name: 'materials', title: 'Üretim Materyalleri', type: 'string'},
    {name: 'paints', title: 'Kullanılan Boya Türü', type: 'string'},
    {name: 'dimensions', title: 'Ölçüler', type: 'string'},
    {name: 'shipping', title: 'Paket & Kargo Notları', type: 'text'},
    {name: 'images', title: 'Görseller', type: 'array', of: [{type: 'image', options: {hotspot: true}}]},
    {name: 'model3d', title: '3D Model (GLB/GLTF URL)', type: 'url'},
    {name: 'variants', title: 'Varyantlar', type: 'array', of: [variant]},
  ],
}


