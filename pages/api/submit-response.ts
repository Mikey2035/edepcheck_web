import { pool } from "@/configs/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { fullName, examCode, totalScore, severity, answers } = req.body;

  if (!fullName || !examCode || totalScore === undefined || !severity || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // 1. Get user ID
    const [userRows]: any = await connection.query("SELECT id FROM users WHERE fullname = ?", [fullName]);
    if (userRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: "User not found" });
    }
    const userId = userRows[0].id;

    // 2. Get exam ID
    const [examRows]: any = await connection.query("SELECT id FROM tb_exam WHERE exam_code = ?", [examCode]);
    if (examRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: "Exam not found" });
    }
    const examId = examRows[0].id;

    // 3. Insert into responses table
    const [responseResult]: any = await connection.query(
      "INSERT INTO responses (user_id, exam_code_id, total_score, severity, submitted_at) VALUES (?, ?, ?, ?, NOW())",
      [userId, examId, totalScore, severity]
    );
    const responseId = responseResult.insertId;

    // 4. Insert into user_responses_details table
    for (const answer of answers) {
      const { choiceId } = answer;
      await connection.query(
  "INSERT INTO user_responses_details (user_id, question_id, choice_id, exam_code_id, response_id, submitted_at) VALUES (?, ?, ?, ?, ?, NOW())",
  [userId, answer.questionId, answer.choiceId, examId, responseId]
);

    }

    await connection.commit();
    return res.status(201).json({ message: "Responses saved successfully" });
  } catch (err) {
    await connection.rollback();
    console.error("Error saving result:", err);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    connection.release();
  }
}
