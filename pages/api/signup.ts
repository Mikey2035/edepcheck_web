import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/configs/database';
import bcrypt from 'bcrypt';

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, email, password, division, position } = req.body;

    try {
      // ✅ Validate required fields
      if (!fullName || !email || !password || !division || !position) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // ✅ Check if email already exists
      const [existingEmailUsers] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      if ((existingEmailUsers as any[]).length > 0) {
        return res.status(409).json({ message: 'Email already exists.' });
      }

      // ✅ Check if fullname already exists
      const [existingUsers] = await pool.execute(
        'SELECT * FROM users WHERE fullname = ?',
        [fullName]
      );
      if ((existingUsers as any[]).length > 0) {
        return res.status(409).json({ message: 'Full name already exists.' });
      }

      // ✅ Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // ✅ Determine role
      let role = 'user';
      if (email === adminEmail && password === adminPassword) {
        role = 'admin';
      }

      // ✅ Insert user into database
      const query = `
        INSERT INTO users (fullname, email, password, division, position, role)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [fullName, email, hashedPassword, division, position, role];
      await pool.execute(query, values);

      return res.status(201).json({ message: 'User successfully created!', role });
    } catch (error: any) {
      console.error('Database error:', error.message, error.stack);

      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email or Full name already exists.' });
      }

      return res.status(500).json({ message: 'Database error. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
