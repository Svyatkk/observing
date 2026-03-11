'use client'
import { useEffect, useState } from 'react'
import type { IUser } from '@/shared/types/user.interface'
import { useParams } from 'next/navigation'
import styles from './profile.module.css'
import type { IComment } from '@/shared/types/comment.interface'
import type { JWTPayload } from 'jose'
type Props = {
    userSession: JWTPayload | null
}

export default function Profile({ userSession }: Props) {
    const params = useParams()
    const id = params?.id
    const [user, setUser] = useState<IUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)


    const [count, setCount] = useState<number>(0)

    const [subscribe, setSubscribe] = useState(false)

    const handleSub = async () => {

        try {
            if (!userSession || !userSession.id || !user) {
                alert("Будь ласка, увійдіть в акаунт");
                return;
            }
            const response = await fetch(`http://localhost:3001/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ useridfollower: userSession.id, useridfollowing: user?.id })
            })


            if (response.ok) {
                const data = await response.json()
                setSubscribe(true)

            }
        } catch (error) {

            console.log(error)
        }


    }


    useEffect(() => {
        if (!id) return

        fetch(`http://localhost:3001/profile/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('User not found')
                return res.json()
            })
            .then(data => {
                setUser(data)
                setCount(data._count?.followers || 0)
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
            <div className={styles.subscribe}>
                <button className={`${styles.butsub}${subscribe ? 'active' : ''}`} onClick={handleSub}>Subscribe</button>

                <div className={styles.followersAmount}>
                    {count}


                </div>
            </div>

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
        </div >
    )
}





