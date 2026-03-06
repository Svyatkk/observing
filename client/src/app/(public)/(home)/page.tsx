
import Image from "next/image"
import Main from "./Main"
import { getUserSession } from "@/lib/session"


export default async function Home() {

    const user = await getUserSession()

    console.log("Дані сесії на сервері:", user)


    return (
        <>


            <Main user={user}></Main>
        </>
    )
}