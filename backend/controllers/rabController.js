import db from "../config/db.js";

export const getRabByProyek = async (req, res) => {
  try {
    const { proyek_id } = req.params;

    const query = `
      SELECT 
        pk.pekerjaan_id,
        pk.nama_pekerjaan,
        sp.sub_id,
        sp.nama_sub,
        r.rab_id,
        r.vol_kontrak,
        r.satuan,
        r.harga_satuan,
        r.total,
        (COALESCE(r.total, 0) / NULLIF((SELECT SUM(total) FROM rab r3 
          JOIN sub_pekerjaan sp3 ON r3.sub_id = sp3.sub_id 
          JOIN pekerjaan pk3 ON sp3.pekerjaan_id = pk3.pekerjaan_id 
          WHERE pk3.proyek_id = ?), 0)) * 100 AS bobot_total
      FROM pekerjaan pk
      JOIN sub_pekerjaan sp ON pk.pekerjaan_id = sp.pekerjaan_id
      LEFT JOIN rab r ON r.sub_id = sp.sub_id
      WHERE pk.proyek_id = ?
      ORDER BY pk.pekerjaan_id, sp.sub_id;
    `;

    const [result] = await db.query(query, [
      proyek_id,
      proyek_id
    ]);

    res.json(result);

  } catch (err) {
    return res.status(500).json(err);
  }
};

// ================= CREATE RAB =================
export const createRab = async (req, res) => {
  try {
    const {
      sub_id,
      vol_kontrak,
      satuan,
      harga_satuan
    } = req.body;

    if (!sub_id) {
      return res.status(400).json({
        message: "sub_id wajib"
      });
    }

    const total =
      (vol_kontrak || 0) *
      (harga_satuan || 0);

    const query = `
      INSERT INTO rab 
      (sub_id, vol_kontrak, satuan, harga_satuan, total)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(
      query,
      [
        sub_id,
        vol_kontrak,
        satuan,
        harga_satuan,
        total
      ]
    );

    res.json({
      message: "RAB berhasil dibuat"
    });

  } catch (err) {
    return res.status(500).json(err);
  }
};

// ================= UPDATE RAB =================
export const updateRab = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      vol_kontrak,
      satuan,
      harga_satuan
    } = req.body;

    const total =
      (vol_kontrak || 0) *
      (harga_satuan || 0);

    const query = `
      UPDATE rab
      SET 
        vol_kontrak = ?,
        satuan = ?,
        harga_satuan = ?,
        total = ?
      WHERE rab_id = ?
    `;

    await db.query(
      query,
      [
        vol_kontrak,
        satuan,
        harga_satuan,
        total,
        id
      ]
    );

    res.json({
      message: "RAB diupdate"
    });

  } catch (err) {
    return res.status(500).json(err);
  }
};

// ================= DELETE RAB =================
export const deleteRab = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM rab WHERE rab_id = ?",
      [id]
    );

    res.json({
      message: "RAB dihapus"
    });

  } catch (err) {
    return res.status(500).json(err);
  }
};