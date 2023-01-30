import type { User } from "@prisma/client";
import prisma from "../../lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
    console.log('hitme-ssr load() called');
    const endpoint = '/api/hitme';
    const res = await fetch(endpoint);
    const text = await res.text();

    try {
        await prisma.$connect();
    } catch(e) {
        console.log('connection error');
        console.log(e);
    }

    let users: User[] = [];

    try {
        users = await prisma.user.findMany();
    } catch(e) {
        console.log(e);
        await prisma.$disconnect();
    }

    prisma.$disconnect();

    return {
        message: text,
        users: users
    }
}