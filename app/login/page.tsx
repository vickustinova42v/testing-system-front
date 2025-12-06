"use client";
import AuthForm from "@/components/authForm";

export default function LoginPage() {
  return (
    <main className="non-registered-user-page">
      <AuthForm
        title="Вход"
        buttonCaption="Войти"
        isRegister={false}
      />
    </main>
  );
}

