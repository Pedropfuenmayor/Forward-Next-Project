import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  intArg,
  list,
  inputObjectType,
} from "nexus";
import validator from "validator";

export const OQ = objectType({
  name: "OQ",
  definition(t) {
    t.int("id");
    t.string("name");
    t.int("challenge_id");
  },
});

export const OQsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getOQ", {
      type: "OQ",
      args: {
        challenge_id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {

        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { challenge_id } = args;

        return ctx.prisma.opportunity_questions.findUnique({
          where:{
            challenge_id
          }
        });
      },
    });
  },
});

export const OQMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createOQ", {
      type: "OQ",
      args: {
        id: nonNull(intArg()),
        name: nonNull(stringArg()),
        challenge_id: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { id, name, challenge_id } = args;

        if (validator.isEmpty(name)) {
          throw Error("Empty Opportunity Question.");
        }

        return ctx.prisma.opportunity_questions.create({
          data: {
            id: +id,
            name,
            challenge_id,
          },
        });
      },
    });
    t.nonNull.field("updateOQ", {
      type: "OQ",
      args: {
        id: nonNull(intArg()),
        name: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { id, name } = args;

        if (validator.isEmpty(name)) {
          throw Error("Empty Opportunity Question.");
        }

        return ctx.prisma.opportunity_questions.update({
          where: {
            id,
          },
          data: {
            name,
          },
        });
      },
    });
    t.nonNull.field("deleteOQ", {
      type: "OQ",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { id} = args;

        return ctx.prisma.opportunity_questions.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
