import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";
import { Project } from "./project";
import { UserType, UpdateUserType, DeleteUserType } from "../../models/models";
import { validateUserInput } from "../../helper/validation";
import { hashPassword } from "../../helper/auth";
import { verifyPassword } from "../../helper/auth";
import validator from "validator";
import { getSession } from "next-auth/react";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("password");
    t.string("email");
    t.list.field("projects", {
      type: Project,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.users
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .projects();
      },
    });
  },
});

export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.users.findMany();
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        id: nonNull(intArg()),
        password: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      async resolve(_root, args: UserType, ctx) {

        const { email, password, id } = args;

        const user: UserType = {
          password,
          email,
          id,
        };

        validateUserInput(user);

        const existingUser = await ctx.prisma.users.findFirst({
          where: {
            email: email,
          },
        });

        if (existingUser) throw Error("User already exist");
        

        const hashedPassword = await hashPassword(password);

        user.password = hashedPassword;

        return ctx.prisma.users.create({ data: user });
      },
    });
    t.nonNull.field("updateUser", {
      type: "User",
      args: {
        oldPassword: nonNull(stringArg()),
        newPassword: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      async resolve(_root, args: UpdateUserType, ctx) {

        const { req } = ctx;

        const session = await getSession({ req });

        if (!session) {
          throw Error("Not authenticated!");
        }

        const { email, oldPassword, newPassword } = args;

        const existingUser = await ctx.prisma.users.findFirst({
          where: { email },
        });

        if (!existingUser) {
          throw new Error("No user found!");
        }

        if (!validator.isLength(newPassword, { min: 7 })) {
          throw Error("Password must be 7 caracters long!");
        }

        const isValid = await verifyPassword(
          oldPassword,
          existingUser.password
        );

        if (!isValid) {
          throw new Error("Invalid password!");
        }

        const hashedPassword = await hashPassword(newPassword);

        const updatedUser = await ctx.prisma.users.update({
          where: { id: existingUser.id },
          data: {
            password: hashedPassword,
          },
        });

        return updatedUser;
      },
    });
    t.nonNull.field("deleteUser", {
      type: "User",
      args: {
        password: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      async resolve(_root, args: DeleteUserType, ctx) {

        const { req } = ctx;

        const session = await getSession({ req });

        if (!session) {
          throw Error("Not authenticated!");
        }

        const { email, password } = args;

       

        const existingUser = await ctx.prisma.users.findFirst({
          where: { email },
        });

        if (!existingUser) {
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(password, existingUser.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        const deletedUser = await ctx.prisma.users.delete({
          where: { id: existingUser.id },
        });

        return deletedUser;
      },
    });
  },
});
