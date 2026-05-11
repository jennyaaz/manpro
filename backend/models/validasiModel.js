import db from "../config/db.js";

export const approveProyek = async (
  proyekId
) => {

  await db.query(`
    UPDATE proyek
    SET
      status_rab = 'approve',
      catatan_revisi = NULL
    WHERE proyek_id = ?
  `, [proyekId]);
};

export const rejectProyek = async (
  proyekId,
  catatan
) => {

  await db.query(`
    UPDATE proyek
    SET
      status_rab = 'reject',
      catatan_revisi = ?
    WHERE proyek_id = ?
  `, [
    catatan,
    proyekId
  ]);
};