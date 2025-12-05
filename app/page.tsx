import Link from "next/link";

export default function Home() {
  return (
    <main className="non-registered-user-page text-white main-page">
      <h1>
        Система тестирования студентов
      </h1>
      <Link href='/auth'>Войти</Link>
      <Link href='/register'>Зарегистрироваться</Link>
    </main>
  );
}
