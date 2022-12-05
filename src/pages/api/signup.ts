import type { NextApiRequest, NextApiResponse } from "next";

import db from "utils/db";
import { hashPassword } from "utils/bcrypt";
import { signToken } from "utils/jwt";
import { AccountModel } from "models";
import { passwordRegex } from "data";

db.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    if (method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed!" });
    }

    const { username, password } = body;

    if (!username || !password || !passwordRegex.test(password)) {
        return res.status(400).json({ error: "Invalid data!" });
    }

    try {
        const hashedPassword = await hashPassword(password);

        const account = await new AccountModel({ username, password: hashedPassword }).save();

        const token = await signToken({ _id: account._id, username });

        return res.status(200).json({ token });
    } catch (e: any) {
        const errors = e.errors;

        if (errors) {
            return res
                .status(400)
                .json({ error: errors[Object.keys(errors)[0]]?.properties?.message });
        }

        if (e.keyValue) {
            return res.status(409).json({ error: "Username already in use!" });
        }

        return res.status(500).json({ error: "There was an internal server error." });
    }
}
