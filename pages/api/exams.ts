// pages/api/exams.ts
import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database"; // Your MySQL connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query("SELECT * FROM tb_exam ORDER BY exam_date DESC");
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch exams" });
    }
  } else if (req.method === "POST") {
    const { exam_code, title, severity, total_examinees, exam_date } = req.body;

    try {
      await pool.query(
        "INSERT INTO tb_exam (exam_code, title, severity, total_examinees, exam_date) VALUES (?, ?, ?, ?, ?)",
        [exam_code, title, severity, total_examinees, exam_date]
      );
      res.status(201).json({ message: "Exam added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to insert exam" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
