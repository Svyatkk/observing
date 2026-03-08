'use client'

import { useState } from 'react';
import styles from './createtweet.module.css';



export default function CreateTweet({ userName }: { userName: string }) {
    const [text, setText] = useState<string>("");



    const handlepost = async () => {
        if (!text.trim() || !userName) return;

        try {
            const response = await fetch(`http://localhost:3001/create/${userName}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                console.log("Твіт створено!");
                setText("");
            } else {
                console.error("Помилка створення твіту");
            }
        } catch (error) {
            console.error("Помилка мережі:", error);
        }
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder='Everyone can see'
                />


                <button className={styles.but} onClick={handlepost}>click</button>
            </label>
        </div>
    )
}