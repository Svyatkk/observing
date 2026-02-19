
type Params = {
    tag?: string
}
export default async function TestPage({ searchParams }: { searchParams: Promise<Params> }) {
    const { tag } = await searchParams


    return <div>
        <h1>Explore {tag && `by some ${tag}`}</h1>

    </div>
}   