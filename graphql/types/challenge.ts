// /graphql/types/Link.ts
import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  intArg,
  list,
  inputObjectType,
} from "nexus";
import { ChallengeType } from "../../models/models";
import { Idea } from "./Idea";
import { OQ } from "./oq";
import { getSession } from "next-auth/react";
import validator from "validator";
import { sqlQuery } from "../../helper/functions";
import {Prisma} from '@prisma/client'

export const Challenge = objectType({
  name: "Challenge",
  definition(t) {
    t.int("id");
    t.string("name");
    t.boolean("is_selected");
    t.int("project_id");
    t.int("index");
    t.string("challenge_type");
    t.list.field("ideas", {
      type: Idea,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.challenges
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .ideas();
      },
    });
    t.field("opportunity_question", {
      type: OQ,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.challenges
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .opportunity_questions();
      },
    });
  },
});

export const ChallengeInputType = inputObjectType({
  name: "ChallengeInputType",
  definition(t) {
    t.int("id");
    t.string("name");
    t.boolean("is_selected");
    t.int("project_id");
    t.int("index");
    t.string("challenge_type");
  },
});

export const ChallengesQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("challenges", {
      type: "Challenge",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.challenges.findMany();
      },
    });
    t.nonNull.list.field("getChallengesByProject", {
      type: "Challenge",
      args: {
        project_id: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {
        const { project_id } = args;
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const challenges = await ctx.prisma.challenges.findMany({
          where: { project_id },
        });

        const organizedChallengesByIndex = challenges.sort(
          (a, b) => a.index - b.index
        );

        return organizedChallengesByIndex;
      },
    });
  },
});

export const ChallengeMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createChallenge", {
      type: "Challenge",
      args: {
        id: nonNull(intArg()),
        name: nonNull(stringArg()),
        project_id: nonNull(intArg()),
        challenge_type: nonNull(stringArg()),
      },
      async resolve(_root, args: ChallengeType, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { id, name, project_id, challenge_type } = args;

        return ctx.prisma.challenges.create({
          data: {
            id: +id,
            name,
            project_id,
            challenge_type,
          },
        });
      },
    });
    t.nonNull.list.field("updateChallenges", {
      type: "Challenge",
      args: {
        challenges: list(nonNull("ChallengeInputType")),
      },
      async resolve(_root, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { challenges } = args;

        const conditions = sqlQuery(challenges);

        await ctx.prisma.$executeRaw`
        UPDATE challenges
          SET index = (CASE
            ${Prisma.raw(conditions)}
          END)`;

        const project_id = challenges[0].project_id;

        return ctx.prisma.challenges.findMany({
          where: { project_id },
        });
      },
    });
    t.nonNull.field("deleteChallenge", {
      type: "Challenge",
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

        return ctx.prisma.challenges.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
