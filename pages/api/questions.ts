import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/configs/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { category_name, question_text, choices } = req.body;

    if (!category_name || !question_text || !Array.isArray(choices)) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    try {
      // 1. Check if category exists
      const [existingCategory]: any = await pool.query(
        'SELECT id FROM categories WHERE name = ?',
        [category_name]
      );

      let categoryId: number;

      if (existingCategory.length > 0) {
        categoryId = existingCategory[0].id;
      } else {
        // 2. Insert category
        const [catResult]: any = await pool.query(
          'INSERT INTO categories (name, created_at) VALUES (?, NOW())',
          [category_name]
        );
        categoryId = catResult.insertId;
      }

      // 3. Insert question
      const [questionResult]: any = await pool.query(
        'INSERT INTO questions (category_id, text, created_at) VALUES (?, ?, NOW())',
        [categoryId, question_text]
      );

      const questionId = questionResult.insertId;

      // 4. Insert choices
      for (const choice of choices) {
        await pool.query(
          'INSERT INTO choices (question_id, text, value, created_at) VALUES (?, ?, ?, NOW())',
          [questionId, choice.text, choice.value]
        );
      }

      return res.status(201).json({ message: 'Inserted successfully' });
    } catch (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: 'Insert failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
