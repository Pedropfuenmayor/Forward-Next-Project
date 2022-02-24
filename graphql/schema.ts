// /graphql/schema.ts
import { makeSchema, declarativeWrappingPlugin } from 'nexus'
import { join } from 'path'
import * as types from './types'



export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), 'nexus-typegen', 'index.d.ts'),
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts'),
  },
});



