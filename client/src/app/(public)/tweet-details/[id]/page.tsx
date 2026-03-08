import styles from './tweetdetails.module.css'
import TweetDetails from './TweetDetails'
import { getUserSession } from '@/lib/session'

export default async function Page() {
    const user = await getUserSession()


    if (!user) {
        return <div>Будь ласка, увійдіть, щоб переглянути цей пост.</div>
    }


    return (
        <>
            <TweetDetails userSession={user} />
        </>
    )
}