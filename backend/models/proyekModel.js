import db from "../config/db.js";

export const getAllProyek = async () => {
  const [rows] = await db.query(`
    SELECT
      p.proyek_id,
      p.nama_proyek,
      p.lokasi,
      p.tahun,
      p.status_rab,
      p.status,
      p.catatan_revisi,
      k.nama_klien
    FROM proyek p
    LEFT JOIN klien k
    ON p.klien_id = k.klien_id
    ORDER BY p.proyek_id DESC
  `);

  return rows;
};

export const getProyekById = async (id) => {
  const [rows] = await db.query(`
    SELECT
      p.*,
      k.nama_klien,
      k.nama_pic,
      k.no_hp,
      k.alamat
    FROM proyek p
    LEFT JOIN klien k
    ON p.klien_id = k.klien_id
    WHERE p.proyek_id = ?
    LIMIT 1
  `, [id]);

  return rows[0];
};

export const createProyek = async (data) => {
  const {
    klien_id,
    nama_proyek,
    lokasi,
    tahun
  } = data;

  await db.query(`
    INSERT INTO proyek (
      klien_id,
      nama_proyek,
      lokasi,
      tahun,
      status_rab,
      status
    )
    VALUES (?, ?, ?, ?, 'pending', 'draft')
  `, [
    klien_id,
    nama_proyek,
    lokasi,
    tahun
  ]);
};

export const updateProyek = async (id, data) => {
  const {
    klien_id,
    nama_proyek,
    lokasi,
    tahun,
    status
  } = data;

  await db.query(`
    UPDATE proyek
    SET
      klien_id = ?,
      nama_proyek = ?,
      lokasi = ?,
      tahun = ?,
      status = ?
    WHERE proyek_id = ?
  `, [
    klien_id,
    nama_proyek,
    lokasi,
    tahun,
    status,
    id
  ]);
};

export const deleteProyek = async (id) => {
  await db.query(`
    DELETE FROM proyek
    WHERE proyek_id = ?
  `, [id]);
};