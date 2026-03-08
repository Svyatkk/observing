'use client'

import styles from './tweetdetails.module.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import type { IComment } from '@/shared/types/comment.interface'
import type { Post } from '@/shared/types/tweet.interface'
import type { JWTPayload } from 'jose'
import Tweet from '@/components/Tweet/Tweet'

export default function TweetDetails({ userSession }: { userSession: JWTPayload | null }) {
    const { id } = useParams()
    const [post, setPost] = useState<Post>()

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:3001/tweet-details/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.log(err))
    }, [id])

    return (
        <div className={styles.container}>
            {post && (
                <>
                    <Tweet object={post} userInSession={userSession} />


                    <div className={styles.commentsList}>
                        {post.comments.map((comment: IComment) => (
                            <div className={styles.comment} key={comment.id}>

                                {comment.content} writen by
                                {comment.user.name}

                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}