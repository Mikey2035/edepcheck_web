import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database"; // adjust path to your db connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    user_id,
    exam_code,
    total_score,
    severity,
    answers, // array of { question_id, choice_id }
  } = req.body;

  if (!user_id || !exam_code || !answers || answers.length === 0) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const submitted_at = new Date();

    // 1. Insert to `responses` table
    const [responseResult]: any = await conn.query(
      `INSERT INTO responses (user_id, exam_code_id, total_score, severity, submitted_at)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, exam_code, total_score, severity, submitted_at]
    );

    const response_id = responseResult.insertId;

    // 2. Insert each answer to `user_response_details`
    for (const answer of answers) {
      const { question_id, choice_id } = answer;

      await conn.query(
        `INSERT INTO user_response_details 
          (user_id, question_id, choice_id, exam_code, response_id, submitted_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, question_id, choice_id, exam_code, response_id, submitted_at]
      );
    }

    await conn.commit();
    conn.release();

    return res.status(200).json({ message: "Responses saved successfully." });
  } catch (error) {
    await conn.rollback();
    conn.release();
    console.error("Error saving responses:", error);
    return res.status(500).json({ error: "Failed to save responses." });
  }
}
