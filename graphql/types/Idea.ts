import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  intArg,
  list,
  inputObjectType,
} from "nexus";
import { Action } from './action'

export const Idea = objectType({
  name: 'Idea',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int("index");
    t.boolean('is_selected')
    t.int('challenge_id')
    t.string('effort')
    t.string('impact')
    t.field('action', {
        type: Action ,
        async resolve(parent, _args, ctx) {
          return await ctx.prisma.ideas
            .findUnique({
              where: {
                id: parent.id ,
              },
            })
            .actions()
        },
      })
  },
})

export const IdeasQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('ideas', {
        type: 'Idea',
        resolve(_parent, _args, ctx) {
          return ctx.prisma.ideas.findMany()
        },
      })
    },
  });
