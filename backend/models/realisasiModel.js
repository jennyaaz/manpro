import db from "../config/db.js";

export const getRealisasiByRab = async (
  rabId
) => {

  const [rows] = await db.query(`
    SELECT
      realisasi_id,
      rab_id,
      minggu_ke,
      tanggal,
      vol_realisasi,
      bobot_realisasi,
      progres,
      catatan
    FROM realisasi
    WHERE rab_id = ?
    ORDER BY minggu_ke ASC
  `, [rabId]);

  return rows;
};

export const createRealisasi = async (
  data
) => {

  const {
    rab_id,
    minggu_ke,
    tanggal,
    vol_realisasi,
    bobot_realisasi,
    progres,
    catatan
  } = data;

  await db.query(`
    INSERT INTO realisasi (
      rab_id,
      minggu_ke,
      tanggal,
      vol_realisasi,
      bobot_realisasi,
      progres,
      catatan
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
    rab_id,
    minggu_ke,
    tanggal,
    vol_realisasi,
    bobot_realisasi,
    progres,
    catatan
  ]);
};

export const updateRealisasi = async (
  id,
  data
) => {

  const {
    minggu_ke,
    tanggal,
    vol_realisasi,
    bobot_realisasi,
    progres,
    catatan
  } = data;

  await db.query(`
    UPDATE realisasi
    SET
      minggu_ke = ?,
      tanggal = ?,
      vol_realisasi = ?,
      bobot_realisasi = ?,
      progres = ?,
      catatan = ?
    WHERE realisasi_id = ?
  `, [
    minggu_ke,
    tanggal,
    vol_realisasi,
    bobot_realisasi,
    progres,
    catatan,
    id
  ]);
};

export const deleteRealisasi = async (
  id
) => {

  await db.query(`
    DELETE FROM realisasi
    WHERE realisasi_id = ?
  `, [id]);
};

export const getProgressByRab = async (
  rabId
) => {

  const [rows] = await db.query(`
    SELECT
      j.minggu_ke,
      j.bobot_rencana,
      r.bobot_realisasi,
      (
        COALESCE(
          r.bobot_realisasi,
          0
        ) -
        COALESCE(
          j.bobot_rencana,
          0
        )
      ) AS deviasi
    FROM jadwal j
    LEFT JOIN realisasi r
    ON j.rab_id = r.rab_id
    AND j.minggu_ke = r.minggu_ke
    WHERE j.rab_id = ?
    ORDER BY j.minggu_ke ASC
  `, [rabId]);

  return rows;
};