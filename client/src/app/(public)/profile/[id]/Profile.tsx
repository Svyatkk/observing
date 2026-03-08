'use client'
import { useEffect, useState } from 'react'
import type { IUser } from '@/shared/types/user.interface'
import { useParams } from 'next/navigation'
import styles from './profile.module.css'
import type { IComment } from '@/shared/types/comment.interface'
export default function Profile() {
    const params = useParams()
    const id = params?.id
    const [user, setUser] = useState<IUser | null>(null)
    const [comments, setComments] = useState<string>("")

    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (!id) return

        fetch(`http://localhost:3001/profile/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('User not found')
                return res.json()
            })
            .then(data => {
                setUser(data)

                setIsLoading(false)
            })
            .catch(err => {
                console.error("Fetch error:", err)
                setIsLoading(false)
            })
    }, [id])




    if (isLoading) return <div>Завантаження...</div>
    if (!user) return <div>Користувача не знайдено</div>

    return (
        <div className={styles.profile}>
            <h1>{user.name}</h1>

            <div className={styles.comments}>
                <h2>Коментарі користувача:</h2>
                {user.comments && user.comments.length > 0 ? (
                    user.comments.map((comment: IComment) => (
                        <div key={comment.id}>
                            {comment.content}
                        </div>
                    ))
                ) : (
                    <p>Коментарів ще немає.</p>
                )}
            </div>
        </div>
    )
}





