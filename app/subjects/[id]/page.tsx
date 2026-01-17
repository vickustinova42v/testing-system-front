"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import { getQuestions } from "@/lib/getQuestions";
import Link from "next/link";

export default function SubjectQuestionsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); // ← правильное получение params
    const subjectId = id;

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getQuestions(subjectId);
                setQuestions(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [subjectId]);

    return (
        <>
            <Header />

            <div className="main-background text-white" style={{ padding: "30px" }}>
                <h1 className="text-2xl font-bold mb-4 " style={{ marginBottom: "20px" }}>
                    Вопросы по предмету #{subjectId}
                </h1>

                {loading && <p>Загрузка...</p>}

                {!loading && questions.length === 0 && (
                    <p>Нет вопросов по этому предмету</p>
                )}

                <ul style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {questions.map((q: any) => (
                        <li
                            key={q.id}
                            style={{
                                background: "var(--blue)",
                                padding: "15px 20px",
                                borderRadius: "var(--radius)",
                            }}
                        >
                            <p className="text-lg">{q.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <Link
                href={`/subjects/${subjectId}/tests`}
                style={{
                    display: "inline-block",
                    marginTop: "20px",
                    padding: "12px 18px",
                    background: "var(--blue)",
                    borderRadius: "var(--radius)",
                    fontWeight: "var(--bold)",
                    color: "white",
                }}
            >
                Тесты
            </Link>

        </>
    );
}
