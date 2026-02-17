import type { PropsWithChildren } from "react";
import { Header } from "@/components/Header/Header";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <>

            <Header></Header>
            <div>
                {children}
            </div>
        </>


    )
}