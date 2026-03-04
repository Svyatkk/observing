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

app.post('/register', withPrisma, async (c) => {
    const prisma = c.get("prisma")

    try {
        const { userName, name, password } = await c.req.json()

        if (!userName || !name || !password) {
            return c.json({ error: "Всі поля є обов'язковими" }, 400)
        }


        const newUser = await prisma.user.create({
            data: {
                name: name,
                userName: userName,
                password: password,


            }
        })




        return c.json(newUser, 201)

    } catch (error) {
        console.error("Помилка бекенду:", error)



        return c.json({ error: "Не вдалося зареєструвати користувача" }, 500)
    }
})

app.get('login', withPrisma, async c => {
    const prisma = c.get('prisma')

    try {
        const { username, password } = await c.req.json()

        const user = await prisma.user.findUnique({
            where: {
                userName: username,
                password: password
            }

        })
        if (!user) {
            return c.json({ error: "Невірний логін або пароль" }, 401)
        }


        return c.json(username)



    } catch (error) {
        console.log(error)
        return c.json({ error: "Помилка сервера" }, 500)
    }

})

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

app.get('/profile/:id', withPrisma, async (c) => {
    const rawId = c.req.param('id');
    console.log("Отримано запит для ID:", rawId);

    const id = Number(rawId);
    if (isNaN(id)) return c.json({ error: "Invalid ID format" }, 400);

    const prisma = c.get("prisma");
    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    if (!user) {
        console.log("Користувача не знайдено в БД");
        return c.json(null, 404);
    }

    return c.json(user);
});

serve(
    {
        fetch: app.fetch,
        port: 3001
    },
    info => {
        console.log('Server is running in port' + info.port)
    }
)
