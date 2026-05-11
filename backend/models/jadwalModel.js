import db from "../config/db.js";

export const getJadwalByRab = async (
  rabId
) => {

  const [rows] = await db.query(`
    SELECT
      jadwal_id,
      rab_id,
      minggu_ke,
      vol_rencana,
      bobot_rencana
    FROM jadwal
    WHERE rab_id = ?
    ORDER BY minggu_ke ASC
  `, [rabId]);

  return rows;
};

export const getTotalBobot = async (
  rabId
) => {

  const [rows] = await db.query(`
    SELECT
      COALESCE(
        SUM(bobot_rencana),
        0
      ) AS total_bobot
    FROM jadwal
    WHERE rab_id = ?
  `, [rabId]);

  return rows[0];
};

export const createJadwal = async (
  data
) => {

  const {
    rab_id,
    minggu_ke,
    vol_rencana,
    bobot_rencana
  } = data;

  await db.query(`
    INSERT INTO jadwal (
      rab_id,
      minggu_ke,
      vol_rencana,
      bobot_rencana
    )
    VALUES (?, ?, ?, ?)
  `, [
    rab_id,
    minggu_ke,
    vol_rencana,
    bobot_rencana
  ]);
};

export const updateJadwal = async (
  id,
  data
) => {

  const {
    minggu_ke,
    vol_rencana,
    bobot_rencana
  } = data;

  await db.query(`
    UPDATE jadwal
    SET
      minggu_ke = ?,
      vol_rencana = ?,
      bobot_rencana = ?
    WHERE jadwal_id = ?
  `, [
    minggu_ke,
    vol_rencana,
    bobot_rencana,
    id
  ]);
};

export const deleteJadwal = async (
  id
) => {

  await db.query(`
    DELETE FROM jadwal
    WHERE jadwal_id = ?
  `, [id]);
};