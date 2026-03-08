'use client'

import styles from './tweetdetails.module.css'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import type { IComment } from '@/shared/types/comment.interface'
import type { Post } from '@/shared/types/tweet.interface'
export default function TweetDetails() {

    const { id } = useParams()

    const [post, setPost] = useState<Post>()


    useEffect(() => {
        fetch(`http://localhost:3001/tweet-details/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.log(err))

    }, [id])


    return (
        <>

            {post &&
                <div>
                    {post.id}
                    {post.title}
                    {post.user.id}
                    {post.user.name}
                    {post.comments.map((comment: IComment, index) => {
                        return <div key={index}>{comment.content}</div>
                    })}
                </div>

            }

        </>
    )
}