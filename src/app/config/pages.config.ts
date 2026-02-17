import { Epilogue } from "next/font/google"

export const PAGES = {
    PROFILE_FAKE: '/profile-fake',
    EXPLORE: '/explore',
    HOME: '/',
    PROFILE: (username: string) => `/user/${username}`
}
