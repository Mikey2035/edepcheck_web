import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/configs/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fullName } = req.query;

  if (!fullName || typeof fullName !== 'string') {
    return res.status(400).json({ message: 'Missing or invalid fullName parameter' });
  }

  try {
    // 🔍 Get user ID
    const [userRows] = await pool.query(
      'SELECT id FROM users WHERE fullName = ?',
      [fullName]
    );

    if (!Array.isArray(userRows) || userRows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = (userRows[0] as any).id;

    const [resultsRows] = await pool.query(
      `SELECT r.id, r.total_score, r.severity, r.submitted_at, e.exam_code
       FROM responses r
       JOIN tb_exam e ON r.exam_code_id = e.id
       WHERE r.user_id = ?
       ORDER BY r.submitted_at DESC`,
      [userId]
    );

    const results = (resultsRows as any[]).map(row => ({
      id: row.id.toString(),
      total_score: row.total_score,
      severity: row.severity,
      submitted_at: row.submitted_at,
      exam_code: row.exam_code,
    }));

    return res.status(200).json({ results });
  } catch (error) {
    console.error('Error fetching results:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
