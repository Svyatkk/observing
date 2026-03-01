'use client'
import { useState, useEffect } from "react"
export default function RegisterPage() {

    const [userName, setUserName] = useState<string>("")

    const handlerRigister = async () => {
        try {
            const resposnse = await fetch(`http://localhost:3001/users`, {
                method: "POST",
                headers: {
                    'Content-Type': `application/json`
                },
                body: JSON.stringify({ name: userName })
            })

            if (resposnse.ok) {
                const data = await resposnse.json()
                console.log("Успішно зареєстровано:", data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>

            <h1>Register Page</h1>
            <label htmlFor="">


                <input onChange={(e) => {
                    setUserName(e.target.value)
                }} type="text" />
            </label>
            <button
                onClick={() => {
                    handlerRigister()
                }}
            >Register</button>
        </>
    )
}