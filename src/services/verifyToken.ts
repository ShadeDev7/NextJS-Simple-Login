export default async function verifyToken(
    token: string
): Promise<{ account: Account; token: string } | null> {
    const request = await fetch("/api/verifyToken", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ token }),
    });

    const data = await request.json();

    if (request.status !== 200) return null;

    return data;
}
