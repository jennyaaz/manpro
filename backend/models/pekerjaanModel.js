import db from "../config/db.js";

export const getPekerjaanByProyek = async (
  proyekId
) => {

  const [rows] = await db.query(`
    SELECT
      p.pekerjaan_id,
      p.proyek_id,
      p.nama_pekerjaan,
      COUNT(sp.sub_id) AS jumlah_sub
    FROM pekerjaan p
    LEFT JOIN sub_pekerjaan sp
    ON p.pekerjaan_id = sp.pekerjaan_id
    WHERE p.proyek_id = ?
    GROUP BY p.pekerjaan_id
    ORDER BY p.pekerjaan_id ASC
  `, [proyekId]);

  return rows;
};

export const createPekerjaan = async (
  data
) => {

  const {
    proyek_id,
    nama_pekerjaan
  } = data;

  await db.query(`
    INSERT INTO pekerjaan (
      proyek_id,
      nama_pekerjaan
    )
    VALUES (?, ?)
  `, [
    proyek_id,
    nama_pekerjaan
  ]);
};

export const updatePekerjaan = async (
  id,
  data
) => {

  const {
    nama_pekerjaan
  } = data;

  await db.query(`
    UPDATE pekerjaan
    SET nama_pekerjaan = ?
    WHERE pekerjaan_id = ?
  `, [
    nama_pekerjaan,
    id
  ]);
};

export const deletePekerjaan = async (
  id
) => {

  await db.query(`
    DELETE FROM pekerjaan
    WHERE pekerjaan_id = ?
  `, [id]);
};