'use client'

import type { Post } from "@/shared/types/tweet.interface"
import styles from './Tweet.module.css'
import Image from "next/image"
type Props = {
    object: Post
}

export default function Tweet({ object }: Props) {
    return (
        <>
            <div className={styles.block}>
                <div className={styles.blockHeader}>
                    <Image
                        alt="something"
                        src={""}
                        height={40}
                        width={40}
                        className={styles.img}
                    ></Image>
                    <div className={styles.textHeader}>
                        <div className={styles.name}>{object.user.name}</div>
                        <div className={styles.header}>
                            {object.title}
                        </div>
                    </div>
                </div>
                <div className={styles.blockContent}>


                </div>
            </div>

        </>
    )
}

