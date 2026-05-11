import db from "../config/db.js";

export const getSubByPekerjaan = async (
  pekerjaanId
) => {

  const [rows] = await db.query(`
    SELECT
      sub_id,
      pekerjaan_id,
      nama_sub
    FROM sub_pekerjaan
    WHERE pekerjaan_id = ?
    ORDER BY sub_id ASC
  `, [pekerjaanId]);

  return rows;
};

export const createSub = async (
  data
) => {

  const {
    pekerjaan_id,
    nama_sub
  } = data;

  await db.query(`
    INSERT INTO sub_pekerjaan (
      pekerjaan_id,
      nama_sub
    )
    VALUES (?, ?)
  `, [
    pekerjaan_id,
    nama_sub
  ]);
};

export const updateSub = async (
  id,
  data
) => {

  const {
    nama_sub
  } = data;

  await db.query(`
    UPDATE sub_pekerjaan
    SET nama_sub = ?
    WHERE sub_id = ?
  `, [
    nama_sub,
    id
  ]);
};

export const deleteSub = async (
  id
) => {

  await db.query(`
    DELETE FROM sub_pekerjaan
    WHERE sub_id = ?
  `, [id]);
};