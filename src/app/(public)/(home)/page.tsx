
import Image from "next/image"
import Tweet from "./Tweet"
import styles from './Tweet.module.css'
import { TWEETS } from "@/shared/data/tweets.data"

export default function Home() {
    return (
        <>
            <main className={styles.main}>

                <h1>
                    Home
                </h1>

                {
                    TWEETS.map((t, index: number) => {
                        return <Tweet key={index} tweet={{
                            author: t.author,
                            text: t.text
                        }}></Tweet>
                    })
                }
            </main >
        </>
    )
}