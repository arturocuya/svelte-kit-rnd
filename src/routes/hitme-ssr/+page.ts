import prisma from "../../lib/prisma";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    console.log('hitme-ssr load() called');
    const endpoint = '/api/hitme';
    const res = await fetch(endpoint);
    const text = await res.text();
    console.log('fetch finished');

    console.log('starting prisma connection');
    try {
        await prisma.$connect();
    } catch(e) {
        console.log('connection error');
        console.log(e);
    }
    
    console.log('prisma connection established');

    let users;

    try {
        users = await prisma.user.findMany();
    } catch(e) {
        console.log('findMany error');
        console.log(e);
        await prisma.$disconnect();
    }

    console.log('found many, disconnecting')
    prisma.$disconnect();

    console.log('hitme-ssr load() finished');
    return {
        message: text,
        users: users ?? [{ name: 'nobody', email: 'nobody@mail.com' }]
    }
}