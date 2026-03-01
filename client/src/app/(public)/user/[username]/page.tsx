import type { Metadata } from 'next'
import Profile from './Profile'


type Props = {
    params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params


    return {
        title: `Profile of ${username}`,
    }


}

export default function ProfilePage() {
    return (
        <div>
            <Profile />



        </div>
    )
}