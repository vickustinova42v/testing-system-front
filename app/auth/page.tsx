import AuthForm from "@/public/components/authForm";

export default function Auth() {
  return (
    <main className="non-registered-user-page">
      <AuthForm 
        action='/authAction' 
        title="Авторизация"
        buttonCaption='Войти'/>
    </main>
  );
}
