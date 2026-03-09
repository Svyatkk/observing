import type { IComment } from "./comment.interface"
import type { ILike } from "./like.interface"
export type Post = {
    id: number
    title: string
    user: {
        id: number
        name: string
    },
    comments: IComment[]
    likes: ILike[]

    _count?: {
        likes: number
    }
}
