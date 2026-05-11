import db from "../config/db.js";

export const getAllUsers = async () => {
  const [rows] = await db.query(`
    SELECT
      user_id,
      nama,
      username,
      role,
      email,
      created_at
    FROM users
    ORDER BY user_id DESC
  `);

  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await db.query(`
    SELECT
      user_id,
      nama,
      username,
      role,
      email
    FROM users
    WHERE user_id = ?
    LIMIT 1
  `, [id]);

  return rows[0];
};

export const createUser = async (data) => {
  const {
    nama,
    username,
    password,
    role,
    email
  } = data;

  await db.query(`
    INSERT INTO users (
      nama,
      username,
      password,
      role,
      email
    )
    VALUES (?, ?, ?, ?, ?)
  `, [
    nama,
    username,
    password,
    role,
    email
  ]);
};

export const updateUser = async (id, data) => {
  const {
    nama,
    username,
    role,
    email
  } = data;

  await db.query(`
    UPDATE users
    SET
      nama = ?,
      username = ?,
      role = ?,
      email = ?
    WHERE user_id = ?
  `, [
    nama,
    username,
    role,
    email,
    id
  ]);
};

export const deleteUser = async (id) => {
  await db.query(`
    DELETE FROM users
    WHERE user_id = ?
  `, [id]);
};