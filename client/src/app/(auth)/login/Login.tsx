'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Login() {

    const [password, setPast] = useState<string>('')
    const [userName, setUsername] = useState<string>()


    const handleLogin = async () => {

        try {
            const response = await fetch(`http://localhost:3001/login`, {
                method: "POSt",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: userName,
                    password: password
                })

            })


            if (response.ok) {
                const data = (await response).json()
                console.log('Успішний вхід')

            }
            else {
                console.log('Помилка вхоу')

            }
        }
        catch (error) {
            console.log(error)


        }

    }

    return (
        <>

            <div>
                Login
            </div>


            <div>
                eneter the username
            </div>

            <label htmlFor=""><input onChange={(e) => {
                setUsername(e.target.value)
            }} type="text" /></label>
            <div>
                enter the password
            </div>


            <label htmlFor=""><input onChange={(e) => {
                setPast(e.target.value)
            }} type="text" /></label>

            <button onClick={handleLogin}>Login</button>

        </>
    )
}