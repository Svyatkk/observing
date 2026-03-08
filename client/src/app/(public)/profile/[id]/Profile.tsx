'use client'
import { useEffect, useState } from 'react'
import type { IUser } from '@/shared/types/user.interface'
import { useParams } from 'next/navigation'
import styles from './profile.module.css'

export default function Profile() {
    const params = useParams()
    const id = params?.id
    const [user, setUser] = useState<IUser | null>(null)
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
        <div>
            <h1>{user.name}</h1>
        </div>
    )
}