import type { ITweet } from "@/shared/types/tweet.interface"
import styles from './Tweet.module.css'
import Link from "next/link"

type Props = {
    tweet: ITweet
}

export default function Tweet({ tweet }: Props) {

    return (
        <>
            <Link
                href={`/user/${tweet.author}`}
                className={styles.container}
            >
                <p className="font-bold">{tweet.author}</p>
                <p>{tweet.text}</p>
            </Link>





        </>
    )
}