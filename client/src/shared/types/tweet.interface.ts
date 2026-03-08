import type { IComment } from "./comment.interface"

export type Post = {
    id: number
    title: string
    user: {
        id: number
        name: string
    },
    comments: IComment[]



}
