// pages/api/exams.ts
import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { exam_code } = req.query;

  if (req.method === "GET") {
    try {
      if (req.query.latest === "true") {
        const [rows]: any = await pool.query(
          "SELECT exam_code, title FROM tb_exam ORDER BY exam_date DESC LIMIT 1"
        );
        return rows.length
          ? res.status(200).json(rows[0])
          : res.status(404).json({ message: "No exams found" });
      }

      const [rows]: any = await pool.query(
        `SELECT 
          e.exam_code, 
          e.title, 
          e.exam_date, 
          IFNULL(r.severity, 'Pending') AS severity, 
          IFNULL(r.total_examinees, 0) AS total_examinees
        FROM tb_exam e
        LEFT JOIN (
          SELECT 
            exam_code_id AS exam_code, 
            COUNT(*) AS total_examinees,
            (
              SELECT CONCAT(severity, ' (', ROUND((COUNT(*) / total.total_count) * 100, 1), '%)')
              FROM responses r2
              JOIN (
                SELECT exam_code_id, COUNT(*) AS total_count 
                FROM responses 
                GROUP BY exam_code_id
              ) AS total 
              ON total.exam_code_id = r1.exam_code_id
              WHERE r2.exam_code_id = r1.exam_code_id
              GROUP BY severity 
              ORDER BY COUNT(*) DESC 
              LIMIT 1
            ) AS severity
          FROM responses r1
          GROUP BY exam_code_id
        ) r ON e.exam_code = r.exam_code
        ORDER BY e.exam_date DESC`
      );

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

  } else if (req.method === "PUT") {
    const { exam_code, title, exam_date } = req.body;
    try {
      await pool.query(
        "UPDATE tb_exam SET title = ?, exam_date = ? WHERE exam_code = ?",
        [title, exam_date, exam_code]
      );
      res.status(200).json({ message: "Exam updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update exam" });
    }

  } else if (req.method === "DELETE") {
    try {
      await pool.query("DELETE FROM tb_exam WHERE exam_code = ?", [exam_code]);
      res.status(200).json({ message: "Exam deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete exam" });
    }

  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
