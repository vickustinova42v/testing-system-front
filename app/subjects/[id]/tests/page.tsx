"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import Header from "@/components/header";

export default function TestsPage({ params }: any) {
    const { id: subjectId } = use(params);

    const [tests, setTests] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/tests/subject/${subjectId}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(setTests);
    }, [subjectId]);

    return (
        <>
            <Header />

            <div className="main-background text-white" style={{ padding: "30px" }}>
                <h1>Тесты по предмету</h1>

                <Link
                    href={`/subjects/${subjectId}/tests/create`}
                    style={{
                        display: "inline-block",
                        padding: "12px 18px",
                        background: "var(--green)",
                        borderRadius: "var(--radius)",
                        fontWeight: "var(--bold)",
                        color: "white",
                        marginBottom: "20px",
                    }}
                >
                    Создать тест
                </Link>

                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {tests.map((t: any) => (
                        <li key={t.id}>
                            <Link
                                href={`/tests/${t.id}`}
                                style={{
                                    display: "block",
                                    padding: "15px 20px",
                                    background: "var(--blue)",
                                    borderRadius: "var(--radius)",
                                    fontWeight: "var(--bold)",
                                }}
                            >
                                {t.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
