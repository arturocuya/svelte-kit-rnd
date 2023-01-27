import type { AsyncReturnType } from "../../lib/asyncReturnType";
import prisma from "../../lib/prisma";

export async function load({ fetch }: any) {
    const endpoint = '/api/hitme';
    const res = await fetch(endpoint);
    const text = await res.text();

    await prisma.$connect();

    let users;

    try {
        users = await prisma.user.findMany();
    } catch(e) {
        console.log(e);
        await prisma.$disconnect();
    }

    prisma.$disconnect();

    return {
        message: text,
        users: users ?? []
    }
}

export type PageData = AsyncReturnType<typeof load>;