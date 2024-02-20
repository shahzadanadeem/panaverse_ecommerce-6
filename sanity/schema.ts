import { type SchemaTypeDefinition } from 'sanity'
import { product } from '@/app/product'
import { category } from '@/app/category'

export const schema = {
  types: [product, category],
}
