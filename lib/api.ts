const BASIC_PATH = 'http://localhost:8080/api';

export async function apiGet(path: string) {
    return fetch(`${BASIC_PATH}${path}`, {
        credentials: "include",
    });
}

export async function apiPost(path: string, body: any) {
    return fetch(`${BASIC_PATH}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
    });
}
