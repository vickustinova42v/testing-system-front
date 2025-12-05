import AuthForm from "@/public/components/authForm";

export default function Register() {
  return (
    <main className="non-registered-user-page">
      <AuthForm 
        action='/registerAction' 
        title="Регистрация"
        buttonCaption='Зарегистрироваться'
        isRegister={ true }/>
    </main>
  );
}