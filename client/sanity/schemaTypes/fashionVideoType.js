export default {
  name: 'fashionVideo',
  title: 'Fashion video',
  type: 'document',
  fields: [
    { name: 'title', title: 'Video title', type: 'string', validation: (rule) => rule.required() },
    { name: 'video', title: 'Finished short clip', type: 'file', description: 'Upload an edited, compressed MP4 or WebM clip. Sanity stores the original file; it does not trim, edit, or compress it.', options: { accept: 'video/mp4,video/webm' }, validation: (rule) => rule.required() },
    { name: 'poster', title: 'Poster image (optional)', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Image description', type: 'string' }] },
    { name: 'description', title: 'Short caption (optional)', type: 'text', rows: 2 },
  ],
  preview: { select: { title: 'title', media: 'poster', subtitle: 'description' } },
}
