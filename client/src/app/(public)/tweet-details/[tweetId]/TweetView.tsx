'use client'

import type { ITweet } from "@/shared/types/tweet.interface"



export default function TweetView({ tweet }: { tweet: ITweet }) {

    return (
        <>


            <div>

                <h1>Tweet by {tweet.author}</h1>
                <p>{tweet.text}</p>

            </div>
        </>
    )
}