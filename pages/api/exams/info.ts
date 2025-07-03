// /pages/api/exam/info.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/configs/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { exam_code } = req.query;

  try {
    const [rows]: any = await pool.query(
      'SELECT title, exam_code FROM tb_exam WHERE exam_code = ?',
      [exam_code]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching exam info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
