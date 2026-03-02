'use client'
import { useState, useEffect } from "react"

export default function Posts() {

    const [posts, setPosts] = useState([])


    useEffect(() => {
        fetch(`http://localhost:3001/posts`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h2>Список постів:</h2>
            <ul>

                {posts.map((post) => (
                    <li key={post.id}>
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}
