export async function getQuestions(subjectId: string) {
    if (!subjectId) throw new Error("subjectId is required");

    const response = await fetch(`http://localhost:8080/questions/subject/${subjectId}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        console.error("Ошибка ответа:", response.status, response.statusText);
        throw new Error("Failed to load questions");
    }

    return response.json();
}
