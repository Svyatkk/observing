import type { Post } from "./tweet.interface"
import type { IUser } from "./user.interface"

export type ILike = {
    id: number
    date: Date | string
    userId: number
    postId: number

    post?: Post
    user?: IUser
}