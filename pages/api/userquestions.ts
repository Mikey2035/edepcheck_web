import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const [rows]: any = await pool.query(`
        SELECT 
          c.name AS category_name,         -- ✅ Renamed from 'category'
          q.id AS question_id,
          q.text AS question_text,
          ch.id AS choice_id,
          ch.text AS choice_text,
          ch.value
        FROM questions q
        JOIN categories c ON q.category_id = c.id
        JOIN choices ch ON ch.question_id = q.id
        ORDER BY c.name, q.id, ch.id       -- ✅ Group by category first
      `);

      const questionsMap: Record<number, any> = {};

      for (const row of rows) {
        if (!questionsMap[row.question_id]) {
          questionsMap[row.question_id] = {
            id: row.question_id,
            text: row.question_text,
            category_name: row.category_name, // ✅ This matches the frontend
            choices: [],
          };
        }

        questionsMap[row.question_id].choices.push({
          id: row.choice_id,
          text: row.choice_text,
          value: row.value,
        });
      }

      const questions = Object.values(questionsMap);
      res.status(200).json(questions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
