'use client'

import type { Post } from "@/shared/types/tweet.interface"
import styles from './Tweet.module.css'
import Image from "next/image"
import { PAGES } from '@/config/pages.config'
import Link from "next/link"
import type { JWTPayload } from "jose"
import { useState } from "react"

type Props = {
    object: Post,
    userInSession: JWTPayload | null
}



export default function Tweet({ object, userInSession }: Props) {
    const [comment, setComment] = useState<string>("")


    const handleComment = async () => {

        if (!userInSession) {
            alert("Будь ласка, увійдіть, щоб залишити коментар");
            return;
        }



        if (!comment.trim()) return;

        try {
            const response = await fetch(`http://localhost:3001/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: comment,
                    userId: userInSession.id,
                    postId: object.id
                })
            })

            if (response.ok) {

                const data = await response.json();
                console.log("Коментар додано:", data);
                setComment("");
            } else {
                console.error("Помилка додавання коментаря");
            }
        } catch (error) {
            console.error("Помилка мережі:", error);
        }
    }


    return (
        <Link href={PAGES.TWEETDETAILS(object.id)} className={styles.block}>
            <div className={styles.blockHeader}>
                <Image
                    alt={object.user.name}
                    src={""}
                    height={40}
                    width={40}
                    className={styles.img}
                />
                <div className={styles.textHeader}>
                    <div className={styles.name}>{object.user.name}</div>
                    <div className={styles.header}>
                        {object.title}
                    </div>
                </div>
            </div>
            <div className={styles.blockContent}>

            </div>

            <div className={styles.blockComment}>
                <label className={styles.label} htmlFor=""><input type="text" onChange={(e) => {
                    setComment(e.target.value)
                }} className={styles.input} placeholder="Write comment" /></label>
                <button onClick={
                    handleComment
                }>Comment</button>
            </div>
        </Link >
    )
}