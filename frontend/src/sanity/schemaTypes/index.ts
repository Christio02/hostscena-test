import { type SchemaTypeDefinition } from 'sanity'
import contactFooter from './contactFooter'
import contactInfo from './contactInfo'
import event from './event'
import news from './news'
import portableText from './portableText'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portableText, event, news, contactInfo, contactFooter],
}
