// /graphql/types/Link.ts
import { objectType, extendType } from 'nexus'


export const Action = objectType({
  name: 'Action',
  definition(t) {
    t.int('id')
    t.string('what')
    t.date('due_date')
    t.date('test_until')
    t.string('succes_criteria')
    t.int('idea_id')
  },
})

export const ActionsQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('action', {
        type: 'Action',
        resolve(_parent, _args, ctx) {
          return ctx.prisma.actions.findMany()
        },
      })
    },
  })