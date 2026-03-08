import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { PrismaClient } from "./generated/prisma/client";
import withPrisma from "./lib/prisma";
import { cors } from 'hono/cors'
import { data } from "react-router-dom";
import * as jwt from 'jsonwebtoken';




const JWT_SECRET = 'tviy_duzhe_sekretniy_kluch';



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

app.post('/comment', withPrisma, async c => {
    const prisma = c.get("prisma")
    try {
        const body = await c.req.json()

        const { postId, userId, content } = body


        const comment = await prisma.comment.create({
            data: {
                userId: userId,
                postId: postId,
                content: content,
            },
        })
        return c.json(comment, 201)

    } catch (error) {
        console.log(error)


    }

})



app.get('/comments', withPrisma, async c => {
    const prisma = c.get("prisma")

    const comments = await prisma.comment.findMany()

    return c.json(comments)



})

app.get('/users', withPrisma, async c => {
    const prisma = c.get("prisma")

    const users = await prisma.user.findMany()


    return c.json(users)

})



app.get('/tweet-details/:id', withPrisma, async c => {
    const prisma = c.get("prisma")

    const id = Number(c.req.param('id'))


    try {
        const tweet = await prisma.post.findUnique({
            where: {
                id: id
            },
            include: {
                comments: true,
                user: true
            }
        })
        return c.json(tweet)
    } catch (error) {
        console.error(error)
        return c.json({ error: "Помилка сервера" }, 500);


    }
})



app.post('/create/:userName', withPrisma, async c => {
    const prisma = c.get("prisma")
    const body = await c.req.json()
    const user = c.req.param('userName')

    try {
        const { text } = body

        const currentUser = await prisma.user.findUnique({
            where: {
                userName: user
            }
        })
        if (!currentUser) {
            return c.json({ error: "Користувача не знайдено" }, 404);
        }
        const tweet = await prisma.post.create({
            data: {
                title: text,
                published: true,
                userid: currentUser?.id,

            }
        })


        return c.json(tweet)


    } catch (error) {
        console.log(error)

        return c.json({ message: 'шось пішло не так' })


    }

})




app.post('/login', withPrisma, async c => {
    const prisma = c.get('prisma')
    try {
        const { userName, password } = await c.req.json()
        if (!userName || !password) {
            return c.json({ error: "Введіть логін та пароль" }, 400)
        }
        const user = await prisma.user.findUnique({
            where: { userName: userName }
        })
        if (!user || user.password !== password) { // Згодом тут додамо bcrypt
            return c.json({ error: "Невірний логін або пароль" }, 401)
        }

        // МАГІЯ ТУТ: Створюємо JWT токен
        // Ми "зашиваємо" в токен ID юзера та його ім'я
        const token = jwt.sign(
            {
                id: user.id,
                userName: user.userName
            },
            JWT_SECRET,
            { expiresIn: '7d' } // Токен діє 7 днів
        );
        // Повертаємо токен на Next.js
        return c.json({ message: "Успіх", token: token })

    } catch (error) {
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

app.get('/:userName', withPrisma, async (c) => {

    const prisma = c.get('prisma')

    const username = c.req.param('userName')

    try {

        const user = await prisma.user.findUnique({
            where: {
                userName: username
            }
        })
        if (!user) {
            console.log('Нема такого юзера')
        }


        return c.json(user)

    } catch (error) {
        console.log(error)
    }
})

app.get('/profile/:id', withPrisma, async (c) => {
    const rawId = c.req.param('id');
    console.log("Отримано запит для ID:", rawId);

    const id = Number(rawId);
    if (isNaN(id)) return c.json({ error: "Invalid ID format" }, 400);

    const prisma = c.get("prisma");

    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            comments: true
        }
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
