import db from "../config/db.js";

const laporanController = {
  // 1. Mengambil data RAB dengan Breakdown per Pekerjaan untuk Form Input
  getFormLaporan: async (req, res) => {
    const { proyek_id } = req.params;
    try {
      const [rows] = await db.query(`
        SELECT 
          p.pekerjaan_id, p.nama_pekerjaan,
          sp.sub_id, sp.nama_sub,
          r.rab_id, r.vol_kontrak, r.satuan, r.bobot_total,
          (SELECT IFNULL(SUM(re.vol_aktual), 0) 
           FROM realisasi re 
           JOIN laporan l ON re.laporan_id = l.laporan_id 
           WHERE re.rab_id = r.rab_id) as vol_lalu
        FROM pekerjaan p
        JOIN sub_pekerjaan sp ON sp.pekerjaan_id = p.pekerjaan_id
        LEFT JOIN rab r ON r.sub_id = sp.sub_id
        WHERE p.proyek_id = ?
        ORDER BY p.pekerjaan_id, sp.sub_id
      `, [proyek_id]);

      // Mengelompokkan data (Mapping Breakdown)
      const breakdown = rows.reduce((acc, row) => {
        const { pekerjaan_id, nama_pekerjaan, ...detail } = row;
        let group = acc.find(g => g.pekerjaan_id === pekerjaan_id);
        if (!group) {
          group = { pekerjaan_id, nama_pekerjaan, items: [] };
          acc.push(group);
        }
        group.items.push(detail);
        return acc;
      }, []);

      res.json(breakdown);
    } catch (err) {
      res.status(500).json({ message: "Gagal mengambil data form: " + err.message });
    }
  },

  // 2. Menyimpan Laporan Mingguan sekaligus Detail Realisasinya (Atomic Transaction)
  storeLaporanDanRealisasi: async (req, res) => {
    const { proyek_id, minggu_ke, tgl_lapor, catatan_kendala, items } = req.body;
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // Step A: Simpan ke tabel Laporan (Header)
      const [laporResult] = await connection.query(
        "INSERT INTO laporan (proyek_id, minggu_ke, tgl_lapor, catatan_kendala) VALUES (?, ?, ?, ?)",
        [proyek_id, minggu_ke, tgl_lapor, catatan_kendala]
      );

      const laporan_id = laporResult.insertId;

      // Step B: Simpan ke tabel Realisasi (Detail)
      // Filter hanya item yang memiliki input volume aktual > 0
      const validItems = items.filter(it => parseFloat(it.vol_aktual) > 0);

      if (validItems.length > 0) {
        const payload = validItems.map(it => [
          laporan_id,
          it.rab_id,
          it.vol_aktual,
          it.bobot_realisasi,
          it.progres
        ]);

        await connection.query(
          "INSERT INTO realisasi (laporan_id, rab_id, vol_aktual, bobot_realisasi, progres) VALUES ?",
          [payload]
        );
      }

      await connection.commit();
      res.status(201).json({ 
        message: "Laporan dan data realisasi berhasil disimpan!",
        laporan_id: laporan_id 
      });

    } catch (err) {
      await connection.rollback();
      res.status(500).json({ message: "Transaksi gagal: " + err.message });
    } finally {
      connection.release();
    }
  }
};

export default laporanController;