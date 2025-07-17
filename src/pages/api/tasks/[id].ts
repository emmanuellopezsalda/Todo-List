import type { NextApiRequest, NextApiResponse } from "next";
import { toggleTaskCompletion, deleteTask } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "ID inválido" });
    }

    if (req.method === "PATCH") {
        const updated = await toggleTaskCompletion(id);
        return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
        await deleteTask(id);
        return res.status(204).end();
    }

    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
