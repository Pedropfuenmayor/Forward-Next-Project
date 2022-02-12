import { objectType, extendType } from 'nexus'


export const OQ = objectType({
  name: 'OQ',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('challenge_id')
  },
});

export const OQsQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('opportunity_questions', {
        type: 'OQ',
        resolve(_parent, _args, ctx) {
          return ctx.prisma.opportunity_questions.findMany()
        },
      })
    },
  })