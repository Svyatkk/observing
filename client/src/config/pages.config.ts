import { Epilogue } from "next/font/google"



export const PAGES = {
    PROFILE_FAKE: '/profile-fake',
    EXPLORE: '/explore',
    HOME: '/',
    CREATE_TWETT: `/create-tweet`,
    LOGIN: '/login',
    REGISTER: '/register',

    TWEETDETAILS: (id: number) => `/tweet-details/${id}`,
    PROFILE: (id: number) => `/profile/${id}`,





}
