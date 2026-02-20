'use client'

import { useRouter } from "next/navigation"
import { PAGES } from '@/app/config/pages.config'


export default function ProfileFake() {

    const router = useRouter()


    return (
        <>

            <div>
                <h1>Profile fake</h1>

                <button onClick={() => {
                    router.push(PAGES.HOME)
                }}>Go to home</button>
            </div>
        </>
    )
}