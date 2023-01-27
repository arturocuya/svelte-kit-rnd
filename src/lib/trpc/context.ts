import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import prisma from '../prisma';

// we're not using the event parameter is this example,
// hence the eslint-disable rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(event: RequestEvent) {
  return {
    prisma
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;