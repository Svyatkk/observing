import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { PrismaClient } from "./generated/prisma/client";
import withPrisma from "./lib/prisma";
import { cors } from 'hono/cors'
import { data } from "react-router-dom";




type ContextwithPrisma = {
    Variables: {
        prisma: PrismaClient
    }
}

const app = new Hono<ContextwithPrisma>()

app.use('/*', cors());


app.get('/posts', withPrisma, async c => {
    const prisma = c.get('prisma')




    const posts = await prisma.post.findMany({
        include: {
            user: true,
            comments: true
        },
        orderBy: {
            id: 'desc'
        },
    })
    return c.json(posts)

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
