import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/configs/database';
import bcrypt from 'bcrypt';

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, email, username, password } = req.body;

    try {
      if (!fullName || !email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Check for existing user
      const [existingUsers] = await pool.execute(
        'SELECT * FROM users WHERE email = ? OR username = ?',
        [email, username]
      );

      if ((existingUsers as any[]).length > 0) {
        return res.status(409).json({ message: 'Username or email already exists.' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Determine role
      let role = 'user';
      if (email === adminEmail && password === adminPassword) {
        role = 'admin';
      }

      // Insert user into database with role
      const query = `
        INSERT INTO users (fullname, email, username, password, role)
        VALUES (?, ?, ?, ?, ?)`;
      const values = [fullName, email, username, hashedPassword, role];
      await pool.execute(query, values);

      return res.status(201).json({ message: 'User successfully created!', role });
    } catch (error: any) {
      console.error('Database error:', error.message, error.stack);

      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Username or email already exists.' });
      }

      return res.status(500).json({ message: 'Database error. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
