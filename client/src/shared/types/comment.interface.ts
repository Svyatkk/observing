import type { IUser } from "./user.interface"


export type IComment = {
    id: number,
    name: string,
    data: Date,
    content: string,
    user: IUser


}




