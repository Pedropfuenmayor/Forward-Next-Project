// /graphql/types/Link.ts
import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";
import { ChallengeType } from "../../models/models";
import { Idea } from "./Idea";
import { OQ } from "./oq";
import { getSession } from "next-auth/react";
import validator from "validator";

export const Challenge = objectType({
  name: "Challenge",
  definition(t) {
    t.int("id");
    t.string("name");
    t.boolean("is_selected");
    t.int("project_id");
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
      resolve(_parent, args, ctx) {
        const { project_id } = args;
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }
        return ctx.prisma.challenges.findMany({ where: { project_id } });
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

        if (validator.isEmpty(name)) {
          throw Error("Empty challenge name.");
        }

        const challenge: ChallengeType = {
          name,
          id,
          project_id,
          challenge_type,
        };

        return ctx.prisma.challenges.create({ data: challenge });
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
