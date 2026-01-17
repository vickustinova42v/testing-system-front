import AuthForm from "@/components/authForm";

export default function RegisterPage() {
  return (
    <main className="non-registered-user-page">
      <AuthForm
        title="Регистрация"
        buttonCaption="Создать аккаунт"
        isRegister={true}
      />
    </main>
  );
}
