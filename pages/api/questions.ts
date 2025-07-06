import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryId = req.query.question_id as string | undefined;
  const bodyId = req.body?.question_id;
  const questionId = parseInt(queryId || bodyId, 10);

  try {
    // ✅ CATEGORY FETCH ONLY
    if (req.method === "GET" && req.query.categories === "1") {
      const [categories]: any = await pool.query(
        "SELECT id, name FROM categories ORDER BY created_at DESC"
      );
      return res.status(200).json(categories);
    }

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

    // ✅ CATEGORY INSERT ONLY
    if (req.method === "POST" && req.body?.only_category) {
      const { category_name } = req.body;
      if (!category_name) {
        return res.status(400).json({ error: "Category name is required" });
      }

      await pool.query(
        "INSERT INTO categories (name, created_at) VALUES (?, NOW())",
        [category_name]
      );

      return res.status(201).json({ message: "Category added successfully" });
    }

    if (req.method === "POST") {
      const { category_name, question_text, choices } = req.body;

      if (!category_name || !question_text || !Array.isArray(choices)) {
        return res.status(400).json({ error: "Missing fields" });
      }

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

      const [questionResult]: any = await pool.query(
        "INSERT INTO questions (category_id, text, created_at) VALUES (?, ?, NOW())",
        [categoryId, question_text]
      );
      const newQuestionId = questionResult.insertId;

      for (const choice of choices) {
        await pool.query(
          "INSERT INTO choices (question_id, text, value, created_at) VALUES (?, ?, ?, NOW())",
          [newQuestionId, choice.text, choice.value]
        );
      }

      return res.status(201).json({ message: "Inserted successfully" });
    }

    if (req.method === "PUT") {
      const { category_name, question_text, choices } = req.body;

      if (
        isNaN(questionId) ||
        !category_name ||
        !question_text ||
        !Array.isArray(choices)
      ) {
        return res.status(400).json({ error: "Missing or invalid fields" });
      }

      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();

        const [existingCategory]: any = await connection.query(
          "SELECT id FROM categories WHERE name = ?",
          [category_name]
        );

        let categoryId: number;
        if (existingCategory.length > 0) {
          categoryId = existingCategory[0].id;
        } else {
          const [catResult]: any = await connection.query(
            "INSERT INTO categories (name, created_at) VALUES (?, NOW())",
            [category_name]
          );
          categoryId = catResult.insertId;
        }

        await connection.query(
          "UPDATE questions SET text = ?, category_id = ? WHERE id = ?",
          [question_text, categoryId, questionId]
        );

        await connection.query("DELETE FROM choices WHERE question_id = ?", [
          questionId,
        ]);

        for (const choice of choices) {
          await connection.query(
            "INSERT INTO choices (question_id, text, value, created_at) VALUES (?, ?, ?, NOW())",
            [questionId, choice.text, choice.value]
          );
        }

        await connection.commit();
        connection.release();

        return res
          .status(200)
          .json({ message: "Question updated successfully" });
      } catch (err) {
        await connection.rollback();
        connection.release();
        throw err;
      }
    }

    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("Question API error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
