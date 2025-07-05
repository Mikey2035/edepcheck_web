import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database";
import bcrypt from "bcrypt";

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      fullName,
      email,
      password,
      division,
      position,
      birthday,
      sex_and_gender,
      civil_status,
    } = req.body;

    try {
      if (
        !fullName ||
        !email ||
        !password ||
        !division ||
        !position ||
        !birthday ||
        !sex_and_gender ||
        !civil_status
      ) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // ✅ Calculate age from birthday
      const birthDate = new Date(birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      // ✅ Check for existing email or fullname
      const [existingEmailUsers] = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      if ((existingEmailUsers as any[]).length > 0) {
        return res.status(409).json({ message: "Email already exists." });
      }

      const [existingUsers] = await pool.execute(
        "SELECT * FROM users WHERE fullname = ?",
        [fullName]
      );
      if ((existingUsers as any[]).length > 0) {
        return res.status(409).json({ message: "Full name already exists." });
      }

      // ✅ Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ Determine role
      let role = "user";
      if (email === adminEmail && password === adminPassword) {
        role = "admin";
      }

      // ✅ Insert user with age
      const query = `
        INSERT INTO users 
        (fullname, email, password, division, position, birthday, sex_and_gender, civil_status, age, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        fullName,
        email,
        hashedPassword,
        division,
        position,
        birthday,
        sex_and_gender,
        civil_status,
        age,
        role,
      ];
      await pool.execute(query, values);

      return res
        .status(201)
        .json({ message: "User successfully created!", role });
    } catch (error: any) {
      console.error("Database error:", error.message);
      return res
        .status(500)
        .json({ message: "Database error. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
