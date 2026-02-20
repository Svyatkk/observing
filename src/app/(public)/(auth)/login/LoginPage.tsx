'use client'
import Link from "next/link"
import { PAGES } from "@/app/config/pages.config"
export default function LoginPage() {




    return (
        <div>
            <h1>Login page</h1>




            <Link href={PAGES.REGISTER}>            <button>To Register Page</button>
            </Link>
        </div>
    )
}