import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from './api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: { studioUrl: 'http://localhost:3333' },
})
