// /graphql/context.ts
import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from 'next'
import prisma from '../lib/prisma'

export type Context = {
  prisma: PrismaClient
  req: NextApiRequest
}
export async function createContext({ req, res }): Promise<Context> {
  return {
    prisma,
    req
  }
}