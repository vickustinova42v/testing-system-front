"use client";

import Header from "@/components/header";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    async function loadUsers() {
        try {
            const res = await fetch("http://localhost:8080/api/users", {
                credentials: "include",
            });

            if (!res.ok) {
                console.error("Ошибка:", res.status);
                return;
            }

            const data = await res.json();
            setUsers(data);
        } catch (e) {
            console.error("Ошибка загрузки:", e);
        }
    }

    async function deleteUser(id: number) {
        try {
            const res = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) {
                console.error("Ошибка удаления:", res.status);
                return;
            }

            setUsers((prev: any[]) => prev.filter((u) => u.id !== id));
        } catch (e) {
            console.error("Ошибка удаления:", e);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <>
            <Header />
            <div className="main-background text-white" style={{ padding: "30px" }}>
                <h1 style={{ marginBottom: "20px" }}>Пользователи</h1>

                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {users.map((u: any) => (
                        <li
                            key={u.id}
                            style={{
                                background: "var(--blue)",
                                padding: "15px 20px",
                                borderRadius: "var(--radius)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontWeight: "var(--bold)",
                            }}
                        >
                            <div>
                                {u.firstName} {u.lastName} — {u.email}
                                <div style={{ opacity: 0.7, fontSize: "14px" }}>
                                    Роль: {u.role?.name || u.role}
                                </div>
                            </div>

                            <button
                                onClick={() => deleteUser(u.id)}
                                style={{
                                    background: "var(--red)",
                                    padding: "8px 12px",
                                    borderRadius: "var(--radius)",
                                    fontWeight: "var(--bold)",
                                    cursor: "pointer",
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
