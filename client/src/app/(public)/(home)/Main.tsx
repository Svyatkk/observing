'use client'

import { useEffect, useState } from "react"
import type { Post } from "@/shared/types/tweet.interface"
import Tweet from "@/components/Tweet/Tweet"
import styles from './main.module.css'
import type { JWTPayload } from "jose"

type Props = {
    user: JWTPayload | null

}


export default function Main({ user }: Props) {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const saveduser = localStorage.getItem('currentuser')

        fetch("http://localhost:3001/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                setLoading(false)



            })
            .catch(err => console.error(err))
    }, [])

    if (loading) return <p>Loading...</p>

    return (
        <>

            <div>
                {user ? String(user.userName) : "Гість"}


            </div>


            <main className={styles.main}>
                {posts.map(post => (
                    <Tweet key={post.id} object={post} />
                ))}
            </ main>
        </>

    )
}