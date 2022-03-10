// /graphql/types/Link.ts
import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";
import { Challenge } from "./challenge";
import { getSession } from "next-auth/react";
import { ProjectType } from "../../models/models";
import validator from "validator";

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.int("id");
    t.string("name");
    t.int("user_id");
    t.list.field("challenges", {
      type: Challenge,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.projects
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .challenges();
      },
    });
  },
});

export const ProjectsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("projects", {
      type: "Project",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.projects.findMany();
      },
    });
    t.list.field("getProjectByUserId", {
      type: "Project",
      args: {
        userId: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { userId } = args;

        return ctx.prisma.projects.findMany({ where: { user_id: userId } });
      },
    });
    t.field("getProjectById", {
      type: "Project",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { id } = args;

        return ctx.prisma.projects.findUnique({ where: { id } });
      },
    });
  },
});

export const ProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createProject", {
      type: "Project",
      args: {
        id: nonNull(intArg()),
        name: nonNull(stringArg()),
        user_id: nonNull(intArg()),
      },
      async resolve(_root, args: ProjectType, ctx) {
        const { req } = ctx;

        const session = await getSession({ req });

        if (!session) {
          throw Error("Not authenticated!");
        }

        const { id, name, user_id } = args;

        if (validator.isEmpty(name)) {
          throw Error("Empty project name.");
        }

        // const existingProject = await ctx.prisma.projects.findFirst({
        //   where: {
        //     name,
        //   },
        // });

        // if (existingProject) {
        //   throw Error("Project already exist");
        // }

        const project: ProjectType = {
          name,
          id,
          user_id,
        };

        return ctx.prisma.projects.create({ data: project });
      },
    });
    t.nonNull.field("deleteProject", {
      type: "Project",
      args: {
        project_id: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        // const { req } = ctx;

        // const session = await getSession({ req });

        // if (!session) {
        //   throw Error("Not authenticated!");
        // }

        const { project_id } = args;

        const deletedUser = await ctx.prisma.projects.delete({
          where: { id: project_id },
        });

        return deletedUser;
      },
    });
  },
});
