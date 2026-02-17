import type { Metadata } from 'next'

type Props = {
    params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `Profile of ${params.username}`,
    }

}

export default function ProfilePage() {
    return <div>Profile</div>
}