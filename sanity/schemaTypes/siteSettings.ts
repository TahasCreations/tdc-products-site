export default {
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  fields: [
    {name: 'whatsAppPhone', title: 'WhatsApp Telefon', type: 'string'},
    {name: 'email', title: 'E-posta', type: 'string'},
    {name: 'phone', title: 'Telefon', type: 'string'},
    {name: 'address', title: 'Adres', type: 'text'},
    {name: 'accent', title: 'Vurgu Rengi', type: 'string'},
    {name: 'defaultLocale', title: 'Varsayılan Dil', type: 'string'},
  ],
}


