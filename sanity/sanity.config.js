import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index.js';

export default defineConfig({
  name: 'debaters-tribune',
  title: "The Debaters' Tribune",

  // ↓ Replace with your actual project ID and dataset after running `npx sanity@latest init`
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title("The Debaters' Tribune")
          .items([
            S.listItem()
              .title('Articles')
              .schemaType('article')
              .child(
                S.documentTypeList('article')
                  .title('Articles')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Contributors')
              .schemaType('contributor')
              .child(S.documentTypeList('contributor').title('Contributors')),
          ]),
    }),
    visionTool(), // GROQ query explorer — remove in production if you like
  ],

  schema: { types: schemaTypes },
});
