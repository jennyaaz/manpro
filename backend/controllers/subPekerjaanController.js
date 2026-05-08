import db from "../config/db.js";

// ================= GET BY PEKERJAAN =================
export const getSubByPekerjaan = async (req, res) => {
  try {
    const { pekerjaan_id } = req.params;

    const query = `
      SELECT * FROM sub_pekerjaan
      WHERE pekerjaan_id = ?
    `;

    const [result] = await db.query(query, [pekerjaan_id]);

    res.json(result);

  } catch (err) {
    return res.status(500).json(err);
  }
};

// ================= GET ALL SUB BY PROYEK ID =================
export const getSubByProyek = async (req, res) => {
  try {
    const { proyek_id } = req.params;

    const query = `
      SELECT sp.sub_id, sp.nama_sub, pk.nama_pekerjaan 
      FROM sub_pekerjaan sp
      JOIN pekerjaan pk ON sp.pekerjaan_id = pk.pekerjaan_id
      WHERE pk.proyek_id = ?
    `;

    const [result] = await db.query(query, [proyek_id]);

    res.json(result);

  } catch (err) {
    return res.status(500).json(err);
  }
};

// ================= CREATE =================
export const createSub = async (req, res) => {
  try {
    const { pekerjaan_id, nama_sub } = req.body;

    await db.query(
      `INSERT INTO sub_pekerjaan (pekerjaan_id, nama_sub)
       VALUES (?, ?)`,
      [pekerjaan_id, nama_sub]
    );

    res.json({
      message: "Sub pekerjaan ditambah"
    });

  } catch (err) {
    return res.status(500).json(err);
  }
};

// ================= UPDATE =================
export const updateSub = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_sub } = req.body;

    await db.query(
      `UPDATE sub_pekerjaan SET nama_sub=? WHERE sub_id=?`,
      [nama_sub, id]
    );

    res.json({
      message: "Sub diupdate"
    });

  } catch (err) {
    return res.status(500).json(err);
  }
};

// ================= DELETE =================
export const deleteSub = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `DELETE FROM sub_pekerjaan WHERE sub_id=?`,
      [id]
    );

    res.json({
      message: "Sub dihapus"
    });

  } catch (err) {
    return res.status(500).json(err);
  }
};