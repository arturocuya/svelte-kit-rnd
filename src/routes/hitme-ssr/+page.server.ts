import type { AsyncReturnType } from "../../lib/asyncReturnType";
import prisma from "../../lib/prisma";

export async function load({ fetch }: any) {
    console.log('hitme-ssr load() called');
    const endpoint = '/api/hitme';
    const res = await fetch(endpoint);
    const text = await res.text();
    console.log('fetch finished');

    console.log('starting prisma connection');
    await prisma.$connect();
    console.log('prisma connection established');

    let users;

    try {
        users = await prisma.user.findMany();
    } catch(e) {
        console.log(e);
        await prisma.$disconnect();
    }

    console.log('found many, disconnecting')
    prisma.$disconnect();

    console.log('hitme-ssr load() finished');
    return {
        message: text,
        users: users ?? []
    }
}

export type PageData = AsyncReturnType<typeof load>;