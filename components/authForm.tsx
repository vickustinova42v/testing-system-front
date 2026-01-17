"use client";
import { useState } from "react";

interface IAuthForm {
    title: string;
    isRegister?: boolean;
    buttonCaption: string;
}

export default function AuthForm(props: IAuthForm) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [fathersName, setFathersName] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const url = props.isRegister
        ? "http://localhost:8080/auth/register"
        : "http://localhost:8080/auth/login";

        const body = props.isRegister
        ? { lastName, firstName, fathersName, email, password }
        : { email, password };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            alert("Ошибка: неверные данные");
            return;
        }

        window.location.href = "/profile";
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h1 className='text-white'>
                { props.title }
            </h1>
            { props.isRegister && (
                <>
                    <input 
                        name='last_name'
                        required 
                        placeholder='Фамилия'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}/>
                    <input 
                        name='first_name'
                        required 
                        placeholder='Имя'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}/>
                    <input 
                        name='fathers_name'
                        placeholder='Отчетство'
                        value={fathersName}
                        onChange={e => setFathersName(e.target.value)}/>
                </>
            )}
            <input 
                name="email" 
                required 
                value={email}
                placeholder='E-mail'
                onChange={e => setEmail(e.target.value)}/>
            <input 
                name="password" 
                required 
                placeholder='Пароль'
                value={password}
                onChange={e => setPassword(e.target.value)}/>
            <button type="submit">
                { props.buttonCaption }
            </button>
        </form>
    )
}