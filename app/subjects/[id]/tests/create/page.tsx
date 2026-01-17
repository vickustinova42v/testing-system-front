"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

export default function CreateTestPage({ params }: any) {
    const { id: subjectId } = use(params);
    const router = useRouter();

    const [name, setName] = useState("");
    const [count, setCount] = useState(5);
    const [loading, setLoading] = useState(false);

    async function handleCreate() {
        if (!name.trim()) return alert("Введите название!");

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/tests", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    questionCount: count,
                    subjectId: Number(subjectId)
                }),
            });

            if (!res.ok) {
                console.error("Ошибка:", res.status);
                alert("Ошибка создания теста");
                return;
            }

            alert("Тест создан!");
            router.push(`/subjects/${subjectId}/tests`);
        } catch (e) {
            console.error(e);
            alert("Ошибка соединения");
        }

        setLoading(false);
    }

    return (
        <>
            <Header />

            <div className="main-background text-white" style={{ padding: "30px" }}>
                <h1>Создание теста</h1>

                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px", width: "400px" }}>
                    <label>
                        Название теста:
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                marginTop: "5px",
                                color: "black"
                            }}
                        />
                    </label>

                    <label>
                        Количество вопросов:
                        <input
                            type="number"
                            value={count}
                            min={1}
                            onChange={(e) => setCount(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                marginTop: "5px",
                                color: "black"
                            }}
                        />
                    </label>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        style={{
                            padding: "12px",
                            background: "var(--green)",
                            borderRadius: "var(--radius)",
                            fontWeight: "var(--bold)",
                            marginTop: "10px"
                        }}
                    >
                        {loading ? "Создание..." : "Создать тест"}
                    </button>
                </div>
            </div>
        </>
    );
}
