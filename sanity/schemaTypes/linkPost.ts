export default {
  name: 'linkPost',
  title: 'Yönlendirme Kartı',
  type: 'document',
  fields: [
    {name: 'title', title: 'Başlık', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'excerpt', title: 'Özet', type: 'text'},
    {name: 'cover', title: 'Kapak Görseli', type: 'image', options: {hotspot: true}},
    {name: 'targetUrl', title: 'Hedef URL', type: 'url', validation: (Rule: any) => Rule.required()},
    {name: 'source', title: 'Kaynak', type: 'string'},
    {name: 'publishedAt', title: 'Tarih', type: 'datetime'},
  ],
}


