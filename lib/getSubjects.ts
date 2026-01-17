export async function getSubjects() {
    const response = await fetch("http://localhost:8080/subjects", {
        cache: "no-store",
        credentials: "include",
    });

    if (!response.ok) {
        console.error("Ошибка ответа:", response.status, response.statusText);
        throw new Error("Failed to load subjects");
    }

    return response.json();
}
