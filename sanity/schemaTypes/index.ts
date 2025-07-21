import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './post.schema'
import { imageType } from './image.schema'
import { richTextType } from './richText'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    postType, 
    imageType, 
    richTextType
  ],
}
