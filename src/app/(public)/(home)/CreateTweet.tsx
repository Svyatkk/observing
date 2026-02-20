import styles from './Tweet.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { TWEETS } from '@/shared/data/tweets.data'


export default function CreateTweet() {

    const [active, setActive] = useState(false)
    const [text, setText] = useState('')
    const [inputText, setInputText] = useState('')

    const params = useParams<{ username: string }>()


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
                            if (inputText.trim() === '') return

                            const newTweet = {
                                id: TWEETS.length + 1,
                                author: params.username,
                                text: inputText
                            }
                            TWEETS.unshift(newTweet)
                            setInputText('')
                            setActive(false)


                        }}
                        className={styles.tweetButton}>Post</button>
                    <p
                        className={`${styles.privacyText} ${text === 'activeText' ? styles.activeText : ''}`} style={{ fontSize: "10px", }}>everyone can see</p>
                </div>

            </label >



        </>
    )
}