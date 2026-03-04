'use client'

import { PAGES } from '@/config/pages.config'
import styles from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {

    const pathName = usePathname()


    console.log(pathName)
    return (
        <>
            <nav className={styles.nav}>
                <Link
                    href='/'                >
                    <Image
                        className={styles.imgLogo}
                        src='/x-logo.jpg'
                        width={30}
                        height={30}
                        priority
                        alt='logo'
                    ></Image>
                </Link>

                <div className={styles.buttons}>
                    <Link href={PAGES.EXPLORE}><p className={pathName === PAGES.EXPLORE ? styles.active : ''}>Explore</p></Link>
                    <Link href={PAGES.PROFILE_FAKE}><p className={pathName === PAGES.PROFILE_FAKE ? styles.active : ''}>Profile</p></Link>
                    <Link href={PAGES.HOME}><p className={pathName === PAGES.HOME ? styles.active : ''}>Home</p ></Link>



                </div>
            </nav>

        </>
    )


}