import {  PrismaClient} from "@prisma/client";

declare global {
    var prima: PrismaClient | undefined
}


const client = globalThis.prima || new PrismaClient()
if(process.env.NODE_ENV !== 'production') globalThis.prima = client;


export default client;