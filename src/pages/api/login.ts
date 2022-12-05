import type { NextApiRequest, NextApiResponse } from "next";

import db from "utils/db";
import { comparePassword } from "utils/bcrypt";
import { signToken } from "utils/jwt";
import { AccountModel } from "models";

db.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    if (method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed!" });
    }

    const { username, password } = body;

    try {
        const account: Account | null = await AccountModel.findOne({ username });

        if (!account) {
            return res.status(400).json({ error: "Invalid username or password!" });
        }

        const matches = await comparePassword(password, account.password!);
        if (!matches) {
            return res.status(400).json({ error: "Invalid username or password!" });
        }

        const token = await signToken({ _id: account._id, username });

        return res.status(200).json({ token });
    } catch (e: any) {
        return res.status(500).json({ error: "There was an internal server error." });
    }
}
