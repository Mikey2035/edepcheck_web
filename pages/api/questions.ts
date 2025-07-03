import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question_id } = req.query;

  try {
    /** GET: Fetch questions with choices */
    if (req.method === "GET") {
      const [rows]: any = await pool.query(`
        SELECT 
          q.id AS question_id,
          q.text AS question_text,
          c.name AS category_name,
          ch.id AS choice_id,
          ch.text AS choice_text,
          ch.value AS choice_value
        FROM questions q
        JOIN categories c ON q.category_id = c.id
        LEFT JOIN choices ch ON q.id = ch.question_id
        ORDER BY q.id, ch.id
      `);

      return res.status(200).json(rows);
    }

    /** POST: Add new question with category + choices */
    if (req.method === "POST") {
      const { category_name, question_text, choices } = req.body;

      if (!category_name || !question_text || !Array.isArray(choices)) {
        return res.status(400).json({ error: "Missing fields" });
      }

      // Check if category exists
      const [existingCategory]: any = await pool.query(
        "SELECT id FROM categories WHERE name = ?",
        [category_name]
      );

      let categoryId: number;
      if (existingCategory.length > 0) {
        categoryId = existingCategory[0].id;
      } else {
        const [catResult]: any = await pool.query(
          "INSERT INTO categories (name, created_at) VALUES (?, NOW())",
          [category_name]
        );
        categoryId = catResult.insertId;
      }

      // Insert question
      const [questionResult]: any = await pool.query(
        "INSERT INTO questions (category_id, text, created_at) VALUES (?, ?, NOW())",
        [categoryId, question_text]
      );
      const questionId = questionResult.insertId;

      // Insert choices
      for (const choice of choices) {
        await pool.query(
          "INSERT INTO choices (question_id, text, value, created_at) VALUES (?, ?, ?, NOW())",
          [questionId, choice.text, choice.value]
        );
      }

      return res.status(201).json({ message: "Inserted successfully" });
    }

    /** PUT: Update question text */
    if (req.method === "PUT") {
      const { question_text } = req.body;
      if (!question_id || !question_text) {
        return res.status(400).json({ error: "Missing fields" });
      }

      await pool.query("UPDATE questions SET text = ? WHERE id = ?", [question_text, question_id]);
      return res.status(200).json({ message: "Question updated successfully" });
    }

    // Method Not Allowed
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("Question API error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
