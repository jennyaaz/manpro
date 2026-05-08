import db from "../config/db.js";

export const getListRab = async (req, res) => { // Tambahkan 'async' di sini
  const query = `
    SELECT 
      p.proyek_id, 
      p.nama_proyek, 
      p.no_spk, 
      p.status_rab, 
      p.catatan_revisi, 
      k.nama_klien,
      IFNULL(SUM(r.total), 0) as total_rab
    FROM proyek p
    LEFT JOIN klien k ON p.klien_id = k.klien_id
    LEFT JOIN pekerjaan pk ON p.proyek_id = pk.proyek_id
    LEFT JOIN sub_pekerjaan sp ON pk.pekerjaan_id = sp.pekerjaan_id
    LEFT JOIN rab r ON sp.sub_id = r.sub_id
    GROUP BY p.proyek_id
    ORDER BY p.created_at DESC
  `;

  try {
    // Pakai [result] karena mysql2/promise mengembalikan array [rows, fields]
    const [result] = await db.query(query); 
    res.json(result);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateValidasiRab = (req, res) => {
  const { proyekId } = req.params;
  const { status_rab, catatan_revisi } = req.body;

  const query = `
    UPDATE proyek 
    SET status_rab = ?, catatan_revisi = ?, updated_at = NOW() 
    WHERE proyek_id = ?`;

  db.query(query, [status_rab, catatan_revisi, proyekId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ 
      message: `Status RAB proyek berhasil diubah ke ${status_rab}`,
      status: status_rab 
    });
  });
};