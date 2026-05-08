import db from "../config/db.js";

// Ambil Pekerjaan Berdasarkan Proyek
export const getPekerjaanByProyek = async (req, res) => {
  try {
    const { proyek_id } = req.params;
    const query = `
      SELECT 
        pk.pekerjaan_id,
        pk.nama_pekerjaan,
        COUNT(sp.sub_id) AS jumlah_sub
      FROM pekerjaan pk
      LEFT JOIN sub_pekerjaan sp ON sp.pekerjaan_id = pk.pekerjaan_id
      WHERE pk.proyek_id = ?
      GROUP BY pk.pekerjaan_id, pk.nama_pekerjaan
      ORDER BY pk.pekerjaan_id ASC
    `;
    const [result] = await db.query(query, [proyek_id]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Pekerjaan
export const createPekerjaan = async (req, res) => {
  try {
    const { proyek_id, nama_pekerjaan } = req.body;
    if (!proyek_id || !nama_pekerjaan) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }
    await db.query(
      "INSERT INTO pekerjaan (proyek_id, nama_pekerjaan) VALUES (?,?)",
      [proyek_id, nama_pekerjaan]
    );
    res.json({ message: "Pekerjaan berhasil ditambah" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Pekerjaan
export const updatePekerjaan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_pekerjaan } = req.body;
    await db.query(
      "UPDATE pekerjaan SET nama_pekerjaan=? WHERE pekerjaan_id=?",
      [nama_pekerjaan, id]
    );
    res.json({ message: "Pekerjaan berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Pekerjaan
export const deletePekerjaan = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM pekerjaan WHERE pekerjaan_id=?", [id]);
    res.json({ message: "Pekerjaan berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};