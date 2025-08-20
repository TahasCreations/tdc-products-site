export default {
  name: 'blogPost',
  title: 'Blog Yazısı',
  type: 'document',
  fields: [
    {name: 'title', title: 'Başlık', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}},
    {name: 'excerpt', title: 'Özet', type: 'text'},
    {name: 'cover', title: 'Kapak Görseli', type: 'image', options: {hotspot: true}},
    {name: 'content', title: 'İçerik', type: 'array', of: [{type: 'block'}]},
    {name: 'tags', title: 'Etiketler', type: 'array', of: [{type: 'string'}]},
    {name: 'publishedAt', title: 'Yayın Tarihi', type: 'datetime'},
  ],
}


