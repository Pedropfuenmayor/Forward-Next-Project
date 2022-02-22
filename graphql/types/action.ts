// /graphql/types/Link.ts
import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  intArg,
  booleanArg,
  list,
  arg,
  core,
} from "nexus";
import validator from "validator";

export const Action = objectType({
  name: "Action",
  definition(t) {
    t.int("id");
    t.string("what");
    t.date("due_date");
    t.string("succes_criteria");
    t.int("idea_id");
  },
});

export const ActionsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("action", {
      type: "Action",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.actions.findMany();
      },
    });
    t.field("getActionByIdeaId", {
      type: "Action",
      args: {
        idea_id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        const { idea_id } = args;

        return ctx.prisma.actions.findUnique({
          where: {
            idea_id,
          },
        });
      },
    });
  },
});

const dateArg = (opts: core.NexusArgConfig<"Date">) =>
  arg({ ...opts, type: "Date" });

export const actionsMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createAction", {
      type: "Action",
      args: {
        id: nonNull(intArg()),
        what: nonNull(stringArg()),
        due_date: nonNull(stringArg()),
        succes_criteria: nonNull(stringArg()),
        idea_id: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { id, what, idea_id, due_date, succes_criteria } = args;

        const date = new Date(due_date)


        if (validator.isEmpty(what)) {
          throw Error("Empty Action.");
        }

        return ctx.prisma.actions.create({
          data: {
            id: +id,
            what,
            idea_id: +idea_id,
            due_date: date,
            succes_criteria
          },
        });
      },
    });
    t.nonNull.field("updateAction", {
      type: "Action",
      args: {
        id: nonNull(intArg()),
        what: nonNull(stringArg()),
        due_date: nonNull(stringArg()),
        succes_criteria: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {

        const { id, what, due_date, succes_criteria } = args;

        if (validator.isEmpty(what)) {
          throw Error("Empty Action.");
        }

        const date = new Date(due_date)

        return ctx.prisma.actions.update({
          where: {
            id,
          },
          data: {
            what,
            due_date: date,
            succes_criteria
          },
        });
      },
    });  
    t.nonNull.field("deleteAction", {
      type: "Action",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { id } = args;

        return ctx.prisma.actions.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
