import { Epilogue } from "next/font/google"



export const PAGES = {
    PROFILE_FAKE: '/profile-fake',
    EXPLORE: '/explore',
    HOME: '/',
    TWEETDETAILS: (id: number) => `/tweet-details/${id}`,
    PROFILE: (username: string) => `/user/${username}`,



}
