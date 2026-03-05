// client/src/app/(auth)/login/page.tsx
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/session';

// Ця функція виконається НА СЕРВЕРІ Next.js
async function loginAction(formData: FormData) {
    'use server';

    const userName = formData.get('userName');
    const password = formData.get('password');


    const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
    });




    if (!res.ok) {


        console.log("Помилка логіну");
        return;
    }

    const data = await res.json();

    if (data.token) {
        await createSession(data.token);
        redirect('/');


    }
}


export default function Login() {
    return (
        <div>
            <h1>Логін</h1>
            {/* Форма викликає Server Action */}
            <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
                <input
                    type="text"
                    name="userName" // ВАЖЛИВО: name має співпадати з formData.get()
                    placeholder="Логін"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                />
                <button type="submit">Увійти</button>
            </form>
        </div>
    );
}