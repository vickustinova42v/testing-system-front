"use client";

import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function check() {
            try {
                const res = await apiGet("/auth/me");

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            }

            setLoading(false);
        }

        check();
    }, []);

    return { user, loading };
}
