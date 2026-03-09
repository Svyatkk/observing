import 'server-only';

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';



const secretKey = process.env.JWT_SECRET || 'tviy_duzhe_sekretniy_kluch';
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(token: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();

    cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}


export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export async function getUserSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;

    if (!session) return null;

    try {

        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });

        return payload;
    } catch (error) {
        console.error('Помилка верифікації токена:', error);
        return null;
    }
}