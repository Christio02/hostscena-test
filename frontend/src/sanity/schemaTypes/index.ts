import { type SchemaTypeDefinition } from 'sanity'
import contactInfo from './contactInfo'
import event from './event'
import home from './home'
import map from './map'

import news from './news'
import portableText from './portableText'
import tickets from './tickets'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portableText, event, news, contactInfo, contactInfo, home, map, tickets],
}
