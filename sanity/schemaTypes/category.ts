export default {
  name: 'category',
  title: 'Kategori',
  type: 'document',
  fields: [
    {name: 'title', title: 'Ad', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}},
    {name: 'description', title: 'Açıklama', type: 'text'},
    {name: 'image', title: 'Kapak Görseli', type: 'image', options: {hotspot: true}},
    {name: 'order', title: 'Sıra', type: 'number'},
  ],
}


