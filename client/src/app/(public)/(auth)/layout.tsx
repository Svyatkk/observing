
import type { PropsWithChildren } from "react"
type Props = {



    children?: React.ReactNode

}

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <>
            {children}



        </>
    )
}