import { TWEETS } from "@/shared/data/tweets.data"
import type { ITweet } from "@/shared/types/tweet.interface"

type Props = {
    params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: Props) {

    const { username } = await params;

    const userTweet = TWEETS.find(t => t.author === username);

    if (!userTweet) {
        return <div>Користувача @{username} не знайдено</div>;
    }




    return (
        <div>
            <h1>Profile</h1>
            <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '10px', gap: "10px" }}>
                <h2>{userTweet.author}</h2>
                <p>Останній твіт: {userTweet.text}</p>
            </div>
        </div>
    )
}