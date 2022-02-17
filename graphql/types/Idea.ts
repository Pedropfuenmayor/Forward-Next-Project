import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  intArg,
  booleanArg,
  list,
  inputObjectType,
} from "nexus";
import { Action } from "./action";
import validator from "validator";
import { sqlQuery } from "../../helper/functions";
import { Prisma } from "@prisma/client";

export const Idea = objectType({
  name: "Idea",
  definition(t) {
    t.int("id");
    t.string("name");
    t.int("index");
    t.boolean("is_selected");
    t.int("challenge_id");
    t.boolean("effort");
    t.boolean("impact");
    t.field("action", {
      type: Action,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.ideas
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .actions();
      },
    });
  },
});

export const IdeaInputType = inputObjectType({
  name: "IdeaInputType",
  definition(t) {
    t.int("id");
    t.string("name");
    t.boolean("is_selected");
    t.int("challenge_id");
    t.int("index");
    t.boolean("effort");
    t.boolean("impact");
  },
});

export const IdeasQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("ideas", {
      type: "Idea",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.ideas.findMany();
      },
    });
    t.nonNull.list.field("getIdeasByChallenge", {
      type: "Idea",
      args: {
        challenge_id: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {
        const { challenge_id } = args;
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const ideas = await ctx.prisma.ideas.findMany({
          where: { challenge_id },
        });

        const organizedIdeasByIndex = ideas.sort((a, b) => a.index - b.index);

        return organizedIdeasByIndex;
      },
    });
  },
});

export const ideasMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createIdea", {
      type: "Idea",
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
          throw Error("Empty idea name.");
        }

        return ctx.prisma.ideas.create({
          data: {
            id: +id,
            name,
            challenge_id: +challenge_id,
          },
        });
      },
    });
    t.nonNull.field("updateIdea", {
      type: "Idea",
      args: {
        id: nonNull(intArg()),
        name: nonNull(stringArg()),
        index: nonNull(stringArg()),
        is_selected: nonNull(booleanArg()),
        effort: nonNull(booleanArg()),
        impact: nonNull(booleanArg()),
      },
      async resolve(_root, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { id, name, is_selected, effort, impact } = args;

        if (validator.isEmpty(name)) {
          throw Error("Empty idea name.");
        }

        return ctx.prisma.ideas.update({
          where: {
            id,
          },
          data: {
            name,
            is_selected,
            effort,
            impact,
          },
        });
      },
    });
    t.nonNull.list.field("updateIdeas", {
      type: "Idea",
      args: {
        ideas: list(nonNull("IdeaInputType")),
      },
      async resolve(_root, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { ideas } = args;

        const conditions = sqlQuery(ideas);

        await ctx.prisma.$executeRaw`
        UPDATE ideas
          SET index = (CASE
            ${Prisma.raw(conditions)}
          END)`;

        const challenge_id = ideas[0].challenge_id;

        return ctx.prisma.ideas.findMany({
          where: { challenge_id },
        });
      },
    });
    t.nonNull.field("deleteIdea", {
      type: "Idea",
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

        return ctx.prisma.ideas.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
