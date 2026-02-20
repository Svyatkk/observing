'use client'

import { useParams } from "next/navigation"
import CreateTweet from "../../(home)/CreateTweet"

export default function Profile() {


    const params = useParams<{ username: string }>()

    return (
        <>


            <CreateTweet></CreateTweet>
            <div>Profile {params.username}</div>


        </>
    )
}