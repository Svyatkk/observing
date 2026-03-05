import { PAGES } from './pages.config'



export const API_CONFIG = {
    baseUrl: PAGES.HOME,
    timeout: 30000,
    withCredentials: true
}


export const AUTH_ENDPOINTS = {
    LOGIN: '/login',
    RESGISER: '/register',
    LOGOUT: '/logoout',
    REFRESH: '/refresh',
    PROFILE: '/profile'


}