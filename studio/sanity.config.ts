'use client'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {resolve} from './src/presentation/resolve'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'jbwzfx7e'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2025-06-03'
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'Høstscena',

  projectId,
  dataset,

  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    presentationTool({
      resolve,
      previewUrl: {
        origin: 'https://deploy-preview-25--hostscena.netlify.app/',
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: 'api/draft-mode/disable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
