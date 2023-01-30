import type { Context } from './context';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

export const t = initTRPC.context<Context>().create();

export const router = t.router({
  addUser: t.procedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .query(async ({ input, ctx }) => {
    await ctx.prisma.$connect();

    await ctx.prisma.user.create({
      data: {
        name: input.name,
        email: input.email
      }
    });

    const allUsers = await ctx.prisma.user.findMany();
    
    return allUsers;
  }),
  deleteUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
    await ctx.prisma.$connect();

    await ctx.prisma.user.delete({
      where: {
        id: input.id
      }
    });

    const allUsers = await ctx.prisma.user.findMany();

    return allUsers;
  })
});

export type Router = typeof router;