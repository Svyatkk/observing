"use client"


import type { ITweet } from "@/shared/types/tweet.interface"
import styles from './Tweet.module.css'
import Link from "next/link"
import { PAGES } from "@/app/config/pages.config"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
    tweet: ITweet
}


export default function Tweet({ tweet }: Props) {

    const router = useRouter()


    const [show, setShow] = useState<unknown>()



    const handleshow = async () => {
        try {
            const result = await fetch(`http://localhost:3001/`, {
                method: "GET"
            })
            if (result.ok) {
                setShow(result)
                console.log('Успішно отримано' + result)
            }
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <>
            <div onClick={() => {
                router.push(PAGES.TWEETDETAILS(tweet.id))
            }} className={styles.container}>

                <div className={styles.blockHigher}>
                    <Image
                        alt="image"
                        src='/favicon.ico'
                        width={30}
                        height={30}
                        priority

                    ></Image>

                    <Link href={PAGES.PROFILE(tweet.author)} onClick={(e) => {
                        e.stopPropagation()
                    }} >


                        <p className="font-bold">{tweet.author}</p>
                    </Link >
                </div>

                <p>{tweet.text}</p>
            </div>


        </>
    )
}