import styles from './Tweet.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { TWEETS } from '@/shared/data/tweets.data'
import { title } from 'process'


export default function CreateTweet() {

    const [active, setActive] = useState(false)
    const [text, setText] = useState('')
    const [inputText, setInputText] = useState('')

    const params = useParams<{ username: string }>()


    const handlePost = async () => {
        try {
            const response = await fetch(`http://localhost:3001/user/react_fan`, {
                method: "POST",
                headers: {
                    'Content-Type': `application/json`
                },
                body: JSON.stringify({ title: inputText })
            })
            if (response.ok) {
                const data = await response.json()
                console.log("Успішно зареєстровано:", data);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        setTimeout(() => {
            setText('activeText')

        }, 5000);

    }, [active])


    return (
        <>


            <label htmlFor="tweet-input" className={`${styles.label} ${active ? styles.active : ''}`}
            >
                <input onChange={(e) => {
                    setInputText(e.target.value)
                }} onClick={() => {
                    setActive(true)
                }} id="tweet-input" type="text" className={styles.input} placeholder="What's happening?" />



                <div className={styles.blockPost}>
                    <button

                        onClick={() => {
                            handlePost()
                        }}
                        className={styles.tweetButton}>Post</button>
                    <p
                        className={`${styles.privacyText} ${text === 'activeText' ? styles.activeText : ''}`} style={{ fontSize: "10px", }}>everyone can see</p>
                </div>

            </label >



        </>
    )
}