// pages/api/examinees.ts
import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const { exam_code, fullname } = req.query;

  if (!exam_code) {
    return res.status(400).json({ error: "Missing exam_code query parameter" });
  }

  try {
    if (fullname) {
      // ✅ Get detailed responses for a single examinee
      const [details]: any = await pool.query(
        `
        SELECT 
          e.exam_code,
          u.fullname,
          q.text AS question,
          c.text AS choice,
          c.value,
          r.total_score,
          r.severity
        FROM user_responses_details urd
        JOIN users u ON urd.user_id = u.id
        JOIN choices c ON urd.choice_id = c.id
        JOIN questions q ON c.question_id = q.id
        JOIN tb_exam e ON urd.exam_code_id = e.id
        JOIN responses r ON urd.response_id = r.id
        WHERE e.exam_code = ? AND u.fullname = ?
        ORDER BY q.id ASC
        `,
        [exam_code, fullname]
      );

      return res.status(200).json(details);
    }

    // ✅ Get all examinees for an exam
    const [results]: any = await pool.query(
      `
      SELECT 
        e.exam_code,
        u.fullname,
        r.total_score,
        r.severity
      FROM responses r
      JOIN users u ON r.user_id = u.id
      JOIN tb_exam e ON r.exam_code_id = e.id
      WHERE e.exam_code = ?
      `,
      [exam_code]
    );

    return res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching examinees:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
