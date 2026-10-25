export default {
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    {
      name: 'socialLinks',
      title: 'Social media accounts',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', title: 'Platform', type: 'string', options: { list: ['Instagram', 'TikTok', 'Facebook', 'X', 'YouTube', 'Pinterest', 'WhatsApp', 'Threads', 'Snapchat', 'LinkedIn'] }, validation: (rule) => rule.required() },
          { name: 'url', title: 'Profile URL', type: 'url', validation: (rule) => rule.required() },
        ],
        preview: { select: { title: 'platform', subtitle: 'url' } },
      }],
    },
  ],
}
