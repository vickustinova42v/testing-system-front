"use client";

import Header from "@/components/header";
import ProtectedRoute from "@/components/protectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
    return (
        <ProtectedRoute>
            <Header />
            <ProfileContent />
        </ProtectedRoute>
    );
}

function ProfileContent() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="main-background">
            <div className="profile-container">
                <h1 className="profile-title">Профиль пользователя</h1>

                <div className="profile-card">
                    <p><span>Фамилия:</span> {user.lastName}</p>
                    <p><span>Имя:</span> {user.firstName}</p>
                    <p><span>Отчество:</span> {user.fathersName || "—"}</p>
                    <p><span>E-mail:</span> {user.email}</p>
                    <p><span>Роль:</span> {user.role}</p>
                </div>
            </div>
        </div>
    );
}
