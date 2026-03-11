import type { IComment } from './comment.interface'
import type { IFollow } from './follow.interface'
export type IUser = {
    id: number,
    name: string,
    userName: string,
    password: string
    comments: IComment[]

    following: IFollow[] // Масив тих, на кого я підписався
    followers: IFollow[] // Масив тих, хто підписався на мене

}


