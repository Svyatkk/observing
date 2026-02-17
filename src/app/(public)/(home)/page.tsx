
import Image from "next/image"
import Tweet from "./Tweet"

import { TWEETS } from "@/shared/data/tweets.data"


export default function Home() {


    return (
        <>

            <h1>Home</h1>

            {
                TWEETS.map((t, index: number) => {
                    return <Tweet key={index} tweet={{
                        author: t.author,
                        text: t.text
                    }}></Tweet>
                })
            }


        </>
    )
}