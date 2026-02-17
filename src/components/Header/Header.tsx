import styles from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
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
                    <Link href='/'><p>Explore</p></Link>
                    <Link href='/'><p>Company</p></Link>
                    <Link href='/'><p>Join us</p></Link>

                </div>
            </nav>

        </>
    )


}