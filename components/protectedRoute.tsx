"use client";

import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
    children,
    roles
}: {
    children: React.ReactNode;
    roles?: string[];
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.replace("/");
            return;
        }

        if (roles && !roles.includes(user.role)) {
            router.replace("/profile");
        }

    }, [loading, user, roles, router]);

    if (loading) return <p>Загрузка...</p>;

    return <>{children}</>;
}
