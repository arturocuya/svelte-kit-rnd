import { PrismaClient } from "@prisma/client";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }: any) {
    const endpoint = '/api/hitme';
    const res = await fetch(endpoint);
    const text = await res.text();

    const prisma = new PrismaClient();
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