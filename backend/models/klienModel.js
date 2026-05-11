import db from "../config/db.js";

export const getAllKlien = async () => {
  const [rows] = await db.query(`
    SELECT
      klien_id,
      nama_klien,
      nama_pic,
      no_hp,
      alamat,
      created_at
    FROM klien
    ORDER BY klien_id DESC
  `);

  return rows;
};

export const getKlienById = async (id) => {
  const [rows] = await db.query(`
    SELECT
      klien_id,
      nama_klien,
      nama_pic,
      no_hp,
      alamat
    FROM klien
    WHERE klien_id = ?
    LIMIT 1
  `, [id]);

  return rows[0];
};

export const createKlien = async (data) => {
  const {
    nama_klien,
    nama_pic,
    no_hp,
    alamat
  } = data;

  await db.query(`
    INSERT INTO klien (
      nama_klien,
      nama_pic,
      no_hp,
      alamat
    )
    VALUES (?, ?, ?, ?)
  `, [
    nama_klien,
    nama_pic,
    no_hp,
    alamat
  ]);
};

export const updateKlien = async (id, data) => {
  const {
    nama_klien,
    nama_pic,
    no_hp,
    alamat
  } = data;

  await db.query(`
    UPDATE klien
    SET
      nama_klien = ?,
      nama_pic = ?,
      no_hp = ?,
      alamat = ?
    WHERE klien_id = ?
  `, [
    nama_klien,
    nama_pic,
    no_hp,
    alamat,
    id
  ]);
};

export const deleteKlien = async (id) => {
  await db.query(`
    DELETE FROM klien
    WHERE klien_id = ?
  `, [id]);
};