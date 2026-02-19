

type Params = {
    username?: string
}
export default async function TestPage({ params }: { params: Promise<Params> }) {
    const { username } = await params

    return <div>
        <h1>Profile {username && `by some ${username}`}</h1>


    </div>
}   