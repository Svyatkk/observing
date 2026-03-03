import type { PropsWithChildren } from "react";
import { Header } from "@/components/Header/Header";
import styles from './layout.module.css'
export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <>
            <Header></Header>
            <div className={styles.container}>
                {children}




            </div >
        </>
    )
}