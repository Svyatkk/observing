'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Register() {

    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [userName, setUserName] = useState<string>("")

    const route = useRouter()

    async function register() {
        try {
            const response = await fetch(`http://localhost:3001/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    userName: userName,
                    password: password
                })
            })

            if (response.ok) {
                const data = await response.json()
                console.log("Успішна реєстрація:", data)
                route.push('/login')
            } else {

                const errorData = await response.json()
                console.error("Помилка реєстрації. Деталі від сервера:", errorData)
                alert(`Помилка: ${errorData.error}`) // Виводимо помилку на екран, щоб одразу її бачити
            }
        } catch (error) {
            console.error("Мережева помилка:", error)
        }
    }

    return (
        <div>
            <h2>Реєстрація</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "200px" }}>
                <label>
                    Ім'я:
                    <input onChange={(e) => setName(e.target.value)} type="text" />
                </label>

                <label>
                    Юзернейм:
                    <input onChange={(e) => setUserName(e.target.value)} type="text" />
                </label>

                <label>
                    Пароль:
                    <input onChange={(e) => setPassword(e.target.value)} type="password" />
                </label>

                <button onClick={register}>Зареєструватися</button>

            </div>
        </div>
    )
}