"use client";

import Link from 'next/link'
import { useAuth } from '../hooks/useAuth';

export default function Header() {
    const { user } = useAuth();

    return (
        <header className='header'>
            <nav>
                <ul className='header__ul'>
                    <div className='header__nav-wrapper'>

                        <li><Link href="/profile">Профиль</Link></li>
                        {(user?.role === 'Преподаватель' || user?.role === 'Студент' || user?.role === 'Администратор') && (
                            <li><Link href="/subjects">Предметы</Link></li>
                        )}
                        {user?.role === 'Администратор' && (
                            <li><Link href="/users">Пользователи</Link></li>
                        )}
                    </div>

                    <li><Link href="/">Выйти</Link></li>
                </ul>
            </nav>
        </header>
    )
}
