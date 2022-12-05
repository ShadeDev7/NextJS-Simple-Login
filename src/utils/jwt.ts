import jwt from "jsonwebtoken";

export async function signToken(payload: string | object | Buffer): Promise<string> {
    return await jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
}

export async function verifyToken(token: string): Promise<string | jwt.JwtPayload | null> {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e: any) {
        return null;
    }
}
