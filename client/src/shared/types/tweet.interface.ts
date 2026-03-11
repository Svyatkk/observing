import type { IComment } from "./comment.interface"
import type { ILike } from "./like.interface"
import type { IUser } from "./user.interface"
export type Post = {
    id: number
    title: string
    user: IUser,
    comments: IComment[]
    likes: ILike[]

    _count?: {
        likes: number
    }
}
