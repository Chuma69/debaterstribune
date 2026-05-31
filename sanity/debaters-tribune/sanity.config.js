import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: "The Debaters' Tribune",

  projectId: '1eyxn40r',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title("The Debaters' Tribune")
          .items([
            // Singleton — opens directly, no list view
            S.listItem()
              .title('Site Settings')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Site Settings')
              ),
            S.divider(),
            S.listItem()
              .title('Articles')
              .icon(() => '✍️')
              .schemaType('article')
              .child(
                S.documentTypeList('article')
                  .title('Articles')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Contributors')
              .icon(() => '👤')
              .schemaType('contributor')
              .child(S.documentTypeList('contributor').title('Contributors')),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
