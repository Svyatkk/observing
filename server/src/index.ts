import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { PrismaClient } from "./generated/prisma/client";
import withPrisma from "./lib/prisma";

type ContextwithPrisma = {
    Variables: {
        prisma: PrismaClient
    }
}



const app = new Hono<ContextwithPrisma>()

app.get('/users', withPrisma, async c => {
    const prisma = c.get('prisma')
    const users = await prisma.user.findMany()
    return c.json(users)
})



app.get('/', c => {
    return c.text('Hello hono')
})

serve(
    {
        fetch: app.fetch,
        port: 3001
    },
    info => {
        console.log('Server is running in port' + info.port)
    }
)
