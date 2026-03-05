'use client'

import { useEffect, useState } from "react"
import type { Post } from "@/shared/types/tweet.interface"
import Tweet from "@/components/Tweet/Tweet"
import styles from './main.module.css'

export default function Main() {
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


            <main className={styles.main}>
                {posts.map(post => (
                    <Tweet key={post.id} object={post} />
                ))}
            </ main>
        </>

    )
}