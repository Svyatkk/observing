import type { Post } from "@/shared/types/tweet.interface"

type Props = {
    object: Post
}

export default function Tweet({ object }: Props) {
    return (
        <>
            <div >
                {object.id}
            </div >
            <div>
                {object.title}
            </div>
            <div>
                {object.user.id}
            </div>
            <div>
                {object.user.name}
            </div>


        </>
    )
}

