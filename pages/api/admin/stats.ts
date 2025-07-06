import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/configs/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { groupBy, division, severity, position, age, sex_and_gender } =
      req.query;

      const allowedGroupFields = [
        "division",
        "position",
        "age",
        "sex_and_gender",
        "civil_status", // ✅ Add this
      ];

    
      
    const groupField = allowedGroupFields.includes(groupBy as string)
      ? groupBy
      : "division";

    const filters: string[] = [];
    const values: any[] = [];

    if (division) {
      filters.push("u.division = ?");
      values.push(division);
    }
    if (severity) {
      filters.push("r.severity = ?");
      values.push(severity);
    }
    if (position) {
      filters.push("u.position = ?");
      values.push(position);
    }
    if (age) {
      filters.push("TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) = ?");
      values.push(age);
    }
    if (sex_and_gender) {
      filters.push("u.sex_and_gender = ?");
      values.push(sex_and_gender);
    }

    const whereClause =
      filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    // Build dynamic SQL
    const groupFieldSql =
      groupField === "age"
        ? `TIMESTAMPDIFF(YEAR, u.birthday, CURDATE())`
        : `u.${groupField}`;

    const query = `
      SELECT
        ${groupFieldSql} AS groupField,
        r.severity,
        COUNT(*) AS total
      FROM responses AS r
      JOIN users AS u ON r.user_id = u.id
      ${whereClause}
      GROUP BY groupField, r.severity
      ORDER BY groupField, r.severity
    `;

    const [results]: any = await pool.query(query, values);
    return res.status(200).json(results);
  } catch (error) {
    console.error("Failed to fetch severity stats:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
