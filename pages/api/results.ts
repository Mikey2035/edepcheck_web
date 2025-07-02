// pages/api/results.ts
import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database"; // adjust if your path differs

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query("SELECT * FROM results ORDER BY created_at DESC");
      res.status(200).json(rows);
    } catch (err) {
      console.error("MySQL error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
