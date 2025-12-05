import Link from 'next/link'

export default function Header() {
    return (
        <header className='header'>
            <nav>
                <ul className='header__ul'>
                    <div className='header__nav-wrapper'>
                        <li>
                            <Link href="/profile">Профиль</Link>
                        </li>
                        <li>
                            <Link href="/subjects">Предметы</Link>
                        </li>
                        <li>
                            <Link href="/users">Пользователи</Link>
                        </li>
                    </div>
                    <li>
                        <Link href="/">Выйти</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}