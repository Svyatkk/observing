import type { Metadata } from "next"
import { TWEETS } from "@/shared/data/tweets.data"
import TweetView from "./TweetView"
import NotFound from '@/app/not-found'


type Props = {
    params: Promise<{ tweetId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { tweetId } = await params
    return {
        title: `Tweet ${tweetId}`,
    }
}


export default async function TweetDetails({ params }: Props) {
    const { tweetId } = await params
    const tweet = TWEETS.find(t => t.id === Number(tweetId))
    if (parseInt(tweetId) === null || parseInt(tweetId) > TWEETS.length) {


        <NotFound></NotFound>
    }
    if (!tweet) return <div>Tweet not found</div>


    return <TweetView tweet={tweet} />
}
