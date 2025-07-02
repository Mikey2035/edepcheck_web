// pages/api/examinees.ts
import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const { exam_code } = req.query;

  try {
    const [results] = await pool.query(
      `SELECT 
         r.exam_code_id AS exam_code,
         u.fullname,
         r.total_score,
         r.severity
       FROM responses r
       JOIN users u ON r.user_id = u.id
       WHERE r.exam_code_id = ?`,
      [exam_code]
    );
    res.status(200).json(results); // ✅ must return an array
  } catch (err) {
    console.error("Error fetching examinees:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
