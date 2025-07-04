import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/configs/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) return res.status(400).json({ error: "Email is required" });

    try {
      const [rows]: any = await pool.query(
        'SELECT id, fullname, email, division, position, role, created_at FROM users WHERE email = ?',
        [email]
      );

      if (rows.length === 0) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === 'PUT') {
    const { email, fullname, division, position } = req.body;

    if (!email || !fullname || !division || !position) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const [result]: any = await pool.query(
        'UPDATE users SET fullname = ?, division = ?, position = ? WHERE email = ?',
        [fullname, division, position, email]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found or not updated" });
      }

      return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("PUT error:", error);
      return res.status(500).json({ error: "Failed to update profile" });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
