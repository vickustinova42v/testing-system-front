"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";

export default function TestStartPage({ params }: any) {
    const testId = params.id;

    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<any>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const loadQuestions = async () => {
        try {
            const res = await fetch(`http://localhost:8080/tests/${testId}/random`, {
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

    const selectAnswer = (questionId: number, answerId: number) => {
        setAnswers((prev: any) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    const submitTest = async () => {
        const payload = Object.entries(answers).map(([qId, aId]) => ({
            questionId: Number(qId),
            answerId: Number(aId),
        }));

        const res = await fetch(`http://localhost:8080/tests/${testId}/submit`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            alert("Ошибка отправки теста");
            return;
        }

        const result = await res.json();
        setScore(result.score);
        setSubmitted(true);
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <>
            <Header />

            <div className="main-background text-white" style={{ padding: 30 }}>
                <h1 style={{ marginBottom: 20 }}>Прохождение теста</h1>

                {submitted ? (
                    <div>
                        <h2 style={{ color: "orange" }}>
                            Ваш результат: {score} / {questions.length}
                        </h2>
                    </div>
                ) : (
                    <>
                        <ul style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {questions.map((q) => (
                                <li
                                    key={q.id}
                                    style={{
                                        padding: 20,
                                        background: "var(--blue)",
                                        borderRadius: "var(--radius)",
                                    }}
                                >
                                    <h3>{q.name}</h3>

                                    <div style={{ marginTop: 10 }}>
                                        {q.answers.map((a: any) => (
                                            <label
                                                key={a.id}
                                                style={{
                                                    display: "block",
                                                    marginTop: 5,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`q-${q.id}`}
                                                    value={a.id}
                                                    checked={answers[q.id] === a.id}
                                                    onChange={() =>
                                                        selectAnswer(q.id, a.id)
                                                    }
                                                    style={{ marginRight: 10 }}
                                                />
                                                {a.text}
                                            </label>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={submitTest}
                            style={{
                                marginTop: 20,
                                padding: "10px 20px",
                                background: "green",
                                borderRadius: "var(--radius)",
                            }}
                        >
                            Отправить тест
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
