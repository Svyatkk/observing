'use client'

import type { Post } from "@/shared/types/tweet.interface"
import styles from './Tweet.module.css'
import Image from "next/image"
import { PAGES } from '@/config/pages.config'
import Link from "next/link"
import type { JWTPayload } from "jose"
import { useState } from "react"
import { useRef } from "react"
import type { ILike } from "@/shared/types/like.interface"
import { data } from "react-router-dom"
type Props = {
    object: Post,
    userInSession: JWTPayload | null
}


export default function Tweet({ object, userInSession }: Props) {
    const [comment, setComment] = useState<string>("")
    const [like, setLike] = useState<number>(object._count?.likes || 0)
    const [wholikes, setWholikes] = useState<ILike[]>(object.likes || [])
    const [active, setActive] = useState(false)
    const [liked, setLiked] = useState(false)


    const handleLIke = async () => {
        if (!userInSession) {
            alert("Будь ласка, увійдіть, щоб залишити коментар");
            return;
        }


        try {

            if (!liked) {


                const response = await fetch(`http://localhost:3001/like/${object.id}/${userInSession.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userid: userInSession.id,
                        postId: object.id,

                    })


                })
                if (response.ok) {
                    const data = await response.json()
                    setLiked(true)
                    setLike(prev => prev + 1)
                    setWholikes(data)



                    console.log(data)
                    console.log("Лайк додано:", data);
                }
            }
            else {

                const response = await fetch(`http://localhost:3001/deletelike/${object.id}/${userInSession.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userid: userInSession.id,
                        postId: object.id,

                    })


                })
                if (response.ok) {
                    setLiked(false)
                    setLike(prev => prev - 1)



                }
            }


        } catch (error) {
            console.log(error)
        }

    }
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
                <Link href={PAGES.PROFILE(object.user.id)}>
                    <Image
                        alt={object.user.name}
                        src={""}
                        height={40}
                        width={40}
                        className={styles.img}
                    />
                </Link>



                <div className={styles.textHeader}>
                    <div className={styles.name}>{object.user.name}</div>
                    <div className={styles.header}>
                        {object.title}
                    </div>
                </div>
            </div>
            <div className={styles.blockContent}>

            </div>
            <div className={styles.blockLikes}>
                <div onClick={handleLIke} className={`${styles.like}${liked ? 'liked' : ''}`}>
                    <span>{like}</span>


                </div>


                <div className={styles.blockTextLikes}>
                    <p onMouseEnter={() => {
                        setActive(true)

                    }}
                        onMouseLeave={() => {
                            setActive(false)

                        }}
                    >
                        Вподобайки
                    </p>
                    <div onMouseEnter={() => {
                        setActive(true)
                    }}
                        onMouseLeave={() => {
                            setActive(false)
                        }}
                        className={`${styles.blockShowLIkes}${like ? 'active' : ''}`}>
                        {wholikes?.map((like, index) => {
                            return <div key={index}>

                                <p>Liked by {like.user?.userName}</p>

                            </div>
                        })}

                    </div>
                </div>
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