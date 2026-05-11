import db from "../config/db.js";

export const getRabBySub = async (
  subId
) => {

  const [rows] = await db.query(`
    SELECT
      r.rab_id,
      r.sub_id,
      r.uraian,
      r.vol_kontrak,
      r.satuan,
      r.harga_satuan,
      r.total,
      r.bobot,
      sp.nama_sub,
      p.nama_pekerjaan
    FROM rab r
    LEFT JOIN sub_pekerjaan sp
    ON r.sub_id = sp.sub_id
    LEFT JOIN pekerjaan p
    ON sp.pekerjaan_id = p.pekerjaan_id
    WHERE r.sub_id = ?
    ORDER BY r.rab_id ASC
  `, [subId]);

  return rows;
};

export const getRabById = async (
  id
) => {

  const [rows] = await db.query(`
    SELECT *
    FROM rab
    WHERE rab_id = ?
    LIMIT 1
  `, [id]);

  return rows[0];
};

export const createRab = async (
  data
) => {

  const {
    sub_id,
    uraian,
    vol_kontrak,
    satuan,
    harga_satuan,
    bobot
  } = data;

  const total =
    Number(vol_kontrak) *
    Number(harga_satuan);

  await db.query(`
    INSERT INTO rab (
      sub_id,
      uraian,
      vol_kontrak,
      satuan,
      harga_satuan,
      total,
      bobot
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
    sub_id,
    uraian,
    vol_kontrak,
    satuan,
    harga_satuan,
    total,
    bobot
  ]);
};

export const updateRab = async (
  id,
  data
) => {

  const {
    uraian,
    vol_kontrak,
    satuan,
    harga_satuan,
    bobot
  } = data;

  const total =
    Number(vol_kontrak) *
    Number(harga_satuan);

  await db.query(`
    UPDATE rab
    SET
      uraian = ?,
      vol_kontrak = ?,
      satuan = ?,
      harga_satuan = ?,
      total = ?,
      bobot = ?
    WHERE rab_id = ?
  `, [
    uraian,
    vol_kontrak,
    satuan,
    harga_satuan,
    total,
    bobot,
    id
  ]);
};

export const deleteRab = async (
  id
) => {

  await db.query(`
    DELETE FROM rab
    WHERE rab_id = ?
  `, [id]);
};