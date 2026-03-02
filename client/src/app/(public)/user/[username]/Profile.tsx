'use client'

import { useParams } from "next/navigation"
import CreateTweet from "../../(home)/CreateTweet"
import { useEffect, useState } from "react"


export default function Profile() {

    const [user, serUser] = useState<string>("")

    useEffect(() => {
        const user = fetch(`http://localhost:3000/user`, {
            method: "GET"
        })
    }, [user])



    const params = useParams<{ username: string }>()

    return (
        <>

            <CreateTweet></CreateTweet>
            <div>Profile {params.username}</div>


        </>
    )
}