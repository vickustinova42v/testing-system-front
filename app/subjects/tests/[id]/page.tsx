"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";

export default function TestPage({ params }: any) {
    const testId = params.id;

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadQuestions = async () => {
        try {
            const res = await fetch(`http://localhost:8080/test-questions/test/${testId}`, {
                credentials: "include",
            });

            if (!res.ok) {
                console.error("Ошибка загрузки вопросов:", res.status);
                return;
            }

            const data = await res.json();
            setQuestions(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    const addQuestion = async () => {
        const questionId = prompt("Введите ID вопроса, который хотите добавить:");
        if (!questionId) return;

        const res = await fetch("http://localhost:8080/test-questions", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ testId, questionId }),
        });

        if (res.ok) loadQuestions();
        else alert("Ошибка добавления вопроса");
    };

    const deleteQuestion = async (id: number) => {
        if (!confirm("Удалить вопрос из теста?")) return;

        const res = await fetch(`http://localhost:8080/test-questions/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (res.ok) loadQuestions();
        else alert("Ошибка удаления");
    };

    const startTest = async () => {
        window.location.href = `/tests/${testId}/start`; // страница прохождения теста
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <>
            <Header />

            <div className="main-background text-white" style={{ padding: "30px" }}>
                <h1 style={{ marginBottom: "20px" }}>Тест #{testId}</h1>

                <button
                    onClick={startTest}
                    style={{
                        marginBottom: "20px",
                        padding: "10px 20px",
                        background: "orange",
                        borderRadius: "var(--radius)"
                    }}
                >
                    Пройти тест
                </button>

                <button
                    onClick={addQuestion}
                    style={{
                        marginBottom: "20px",
                        padding: "10px 20px",
                        background: "green",
                        borderRadius: "var(--radius)",
                        marginLeft: "20px"
                    }}
                >
                    Добавить вопрос
                </button>

                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {questions.map((q: any) => (
                        <li
                            key={q.id}
                            style={{
                                background: "var(--blue)",
                                padding: "15px 20px",
                                borderRadius: "var(--radius)",
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <span>{q.question.name}</span>

                            <button
                                onClick={() => deleteQuestion(q.id)}
                                style={{
                                    background: "red",
                                    padding: "5px 10px",
                                    borderRadius: "var(--radius)"
                                }}
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
