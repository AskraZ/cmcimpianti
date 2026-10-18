import { defineType, defineField } from 'sanity'

export const lavoro = defineType({
  name: 'lavoro',
  title: 'Lavoro',
  type: 'document',
  fields: [
    defineField({ name: 'titolo', title: 'Titolo', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'servizio',
      title: 'Servizio',
      type: 'string',
      validation: (r) => r.required(),
      options: {
        layout: 'radio',
        list: [
          { title: 'Elettrico', value: 'elettrico' },
          { title: 'Videosorveglianza', value: 'video' },
          { title: 'Giardinaggio', value: 'verde' },
          { title: 'Siti web', value: 'web' },
        ],
      },
    }),
    defineField({ name: 'descrizione', title: 'Descrizione', type: 'text', rows: 3 }),
    defineField({
      name: 'foto',
      title: 'Foto (la prima è la copertina)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Cosa mostra la foto', type: 'string' }],
        },
      ],
    }),
    defineField({ name: 'data', title: 'Data del lavoro', type: 'date' }),
  ],
  preview: { select: { title: 'titolo', subtitle: 'servizio', media: 'foto.0' } },
})
