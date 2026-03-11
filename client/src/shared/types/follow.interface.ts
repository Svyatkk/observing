import type { Post } from "./tweet.interface"
import type { IUser } from "./user.interface"

export type IFollow = {
    id: number
    createdAt: Date | string
    followerId: number
    followingId: number
    follower?: IUser
    following?: IUser
}