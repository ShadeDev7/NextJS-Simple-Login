import type { NextApiRequest, NextApiResponse } from "next";

import db from "utils/db";
import { verifyToken, signToken } from "utils/jwt";
import { AccountModel } from "models";

db.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    if (method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed!" });
    }

    const { token } = body;

    try {
        const decoded = (await verifyToken(token)) as Account | null;
        if (!decoded) {
            return res.status(400).json({ error: "Invalid token!" });
        }

        const account: { _doc: Account } | null = await AccountModel.findOne({ _id: decoded._id });

        if (!account) {
            return res.status(404).json({ error: "Account not found!" });
        }

        account._doc.password = undefined!;

        const newToken = await signToken(account._doc);

        return res.status(200).json({ account: account._doc, token: newToken });
    } catch (e: any) {
        return res.status(500).json({ error: "There was an internal server error." });
    }
}
