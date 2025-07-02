import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/configs/database';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // ✅ Validate required fields
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }

      // ✅ Find user by email
      const query = `SELECT * FROM users WHERE email = ? LIMIT 1`;
      const [rows]: any = await pool.execute(query, [email]);

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const user = rows[0];

      // ✅ Compare hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // ✅ Return user data
      return res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
