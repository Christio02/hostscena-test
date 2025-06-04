import { type SchemaTypeDefinition } from 'sanity'
import event from './event'
import portableText from './portableText'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portableText, event],
}
