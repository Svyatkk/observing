import type { PropsWithChildren } from "react";
import { Header } from "@/components/Header/Header";
import styles from './layout.module.css'
import CreateTweet from "@/components/CreateTweet/CreateTweet";
import { getUserSession } from "@/lib/session";
import type { JWTPayload } from "jose";
export default async function Layout({ children }: PropsWithChildren<unknown>) {


    const session = await getUserSession()
    const userName = session?.userName as string || "";



    return (
        <>
            <Header></Header>
            <div className={styles.container}>

                <div className={styles.child1}>

                </div>
                <div className={styles.panel}>
                    <CreateTweet userName={userName}></CreateTweet>


                    {children}


                </div>

                <div className={styles.child2}>

                </div>

            </div >
        </>
    )
}