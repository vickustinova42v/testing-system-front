"use client";

import Link from "next/link";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { getSubjects } from "@/lib/getSubjects";

export default function Subjects() {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getSubjects().then(setSubjects);
    }, []);

    return (
        <>
            <Header />
            <div className="main-background text-white" style={{ padding: "30px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1>Предметы</h1>

                    <Link
                        href="/subjects/create"
                        style={{
                            padding: "10px 20px",
                            background: "var(--blue)",
                            borderRadius: "var(--radius)",
                            fontWeight: "bold",
                        }}
                    >
                        Создать предмет
                    </Link>
                </div>

                <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                    {subjects.map((s: any) => (
                        <li key={s.id}>
                            <Link
                                href={`/subjects/${s.id}`}
                                style={{
                                    display: "block",
                                    padding: "15px 20px",
                                    background: "var(--blue)",
                                    borderRadius: "var(--radius)",
                                    fontWeight: "var(--bold)",
                                }}
                            >
                                {s.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
