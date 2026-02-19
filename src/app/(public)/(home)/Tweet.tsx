"use client"


import type { ITweet } from "@/shared/types/tweet.interface"
import styles from './Tweet.module.css'
import Link from "next/link"
import { PAGES } from "@/app/config/pages.config"
import Image from "next/image"
import { useRouter } from "next/navigation"


type Props = {
    tweet: ITweet
}


export default function Tweet({ tweet }: Props) {

    const router = useRouter()


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