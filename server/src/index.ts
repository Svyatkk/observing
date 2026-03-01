import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { PrismaClient } from "./generated/prisma/client";
import withPrisma from "./lib/prisma";
import { cors } from 'hono/cors'




type ContextwithPrisma = {
    Variables: {
        prisma: PrismaClient
    }
}

const app = new Hono<ContextwithPrisma>()

app.use('/*', cors());
app.get('/users', withPrisma, async c => {
    const prisma = c.get('prisma')
    const users = await prisma.user.findMany()
    return c.json(users)
})

app.get('/users/:id', withPrisma, async c => {

    const prisma = c.get('prisma')
    const id = Number(c.req.param('id'))
    const user = await prisma.user.findUnique({
        where: { id }
    })
})

app.post('/users', withPrisma, async c => {
    const prisma = c.get('prisma')
    const { name } = await c.req.json()

    const user = await prisma.user.create({
        data: {
            name
        }
    })
    return c.json(user, 201)
})


app.post('/user/:name', withPrisma, async c => {
    const prisma = c.get('prisma')
    const name = c.req.param('name')
    const { title } = await c.req.json()

    const found = await prisma.user.findFirst({
        where: { name: name }
    })

    let currentUserId: number
    if (!found) {
        const user = await prisma.user.create({
            data: { name: name }
        })
        currentUserId = user.id
    } else {
        currentUserId = found.id
    }

    const post = await prisma.post.create({
        data: {
            title: title,
            userid: currentUserId,
        }
    })

    return c.json(post, 201)
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
