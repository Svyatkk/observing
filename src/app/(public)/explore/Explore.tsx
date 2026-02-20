'use client'

import { useSearchParams } from "next/navigation"
export default function Explore() {


    const searchParams = useSearchParams()

    const tag = searchParams.get('tag')


    return (
        <>
            <h1>{tag && `explore by ${tag}`}</h1>




            <div>something</div>
        </>
    )
}