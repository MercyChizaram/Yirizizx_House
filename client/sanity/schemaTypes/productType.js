export default {
  name: 'product',
  title: 'Clothing item',
  type: 'document',
  fields: [
    { name: 'title', title: 'Item name', type: 'string', validation: (rule) => rule.required() },
    { name: 'price', title: 'Price in NGN', type: 'number', validation: (rule) => rule.min(0) },
    { name: 'currency', title: 'Currency code', type: 'string', initialValue: 'NGN' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'description', title: 'Short description', type: 'text', rows: 3 },
    { name: 'imageDescription', title: 'Image description (alt text)', type: 'string', description: 'Describe what a visitor would see. Can be filled before adding a product photo.' },
    { name: 'image', title: 'Product image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Image description', type: 'string' }] },
    { name: 'whatsappNumber', title: 'WhatsApp number (optional override)', type: 'string', description: 'International format without +. Leave blank to use the site number.' },
    { name: 'isAvailable', title: 'Available to enquire about', type: 'boolean', initialValue: true },
  ],
  preview: { select: { title: 'title', media: 'image', subtitle: 'price' }, prepare({ title, media, subtitle }) { return { title, media, subtitle: subtitle == null ? 'Price not set' : `₦${subtitle.toLocaleString()}` } } },
}
