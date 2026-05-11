import db from "../config/db.js";

export const findUserByUsername = async (username) => {
  const [rows] = await db.query(`
    SELECT
      user_id,
      nama,
      username,
      password,
      role,
      email
    FROM users
    WHERE username = ?
    LIMIT 1
  `, [username]);

  return rows[0];
};