import Profile from "./Profile"
import { getUserSession } from "@/lib/session"


export default async function page() {
    const user = await getUserSession()

    if (!user) {
        console.log('There is no')

    }

    return (
        <>

            <Profile userSession={user}></Profile>
        </>
    )
}