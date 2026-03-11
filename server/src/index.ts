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

app.get('/likes', withPrisma, async c => {
    const prisma = c.get("prisma")

    const likes = await prisma.like.findMany()

    return c.json(likes)




})

app.get('/users', withPrisma, async c => {
    const prisma = c.get("prisma")

    const users = await prisma.user.findMany()
    return c.json(users)

})




app.post('/like/:postid/:userid', withPrisma, async c => {
    const prisma = c.get("prisma")
    const postid = Number(c.req.param('postid'))
    const userid = Number(c.req.param('userid'))

    try {

        const like = await prisma.like.create({
            data: {
                postId: postid,
                userId: userid,
            }
        })

        const getallLikes = await prisma.like.findMany({
            where: {
                postId: postid
            },
            include: {
                user: true
            }
        })



        return c.json(getallLikes, 201)

    } catch (error) {
        console.log(error)
    }

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
                user: true,
                likes: {
                    include: { user: true }
                },
                comments: {
                    include: { user: true }
                },
                _count: {
                    select: { likes: true }
                },
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
        const token = jwt.sign(
            {
                id: user.id,
                userName: user.userName
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );


        return c.json({ message: "Успіх", token: token })

    } catch (error) {
        return c.json({ error: "Помилка сервера" }, 500)
    }
})

app.delete('/deletelike/:postid/:userinsessionid', withPrisma, async c => {
    const prisma = c.get('prisma')

    const postid = Number(c.req.param('postid'))
    const userinsessionid = Number(c.req.param('userinsessionid'))

    try {
        const like = await prisma.like.deleteMany({
            where: {
                postId: postid,
                userId: userinsessionid
            },
        })

        return c.json(like)

    } catch (error) {
        console.log(error)
        return c.json({ error: "Щось пішло не так" }, 500)
    }
})


app.get('/posts', withPrisma, async c => {
    const prisma = c.get('prisma')

    const posts = await prisma.post.findMany({
        include: {
            user: true,
            comments: true,
            likes: {
                include: { user: true }
            },
            _count: {
                select: { likes: true }
            }
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

app.post('/subscribe', withPrisma, async c => {
    const prisma = c.get('prisma')
    const body = await c.req.json()

    const { useridfollowing, useridfollower } = body

    if (useridfollowing === useridfollower) {
        return c.json({ error: "Не можна підписатися на самого себе" }, 400)
    }

    try {
        const follow = await prisma.follow.create({
            data: {
                followerId: useridfollower,
                followingId: useridfollowing,
            }
        })
    } catch (error) {
        console.log(error)
        return c.json({ error: "Помилка при підписці (можливо, ви вже підписані)" }, 500)
    }


    return c.json(follow)



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
            comments: true,
            following: true,
            _count: {
                select: {
                    followers: true
                }
            }

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

