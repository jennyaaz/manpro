import db from "../config/db.js";

const jadwalController = {
    getMasterRab: async (req, res) => {
        const { proyek_id } = req.params;
        try {
            const [rows] = await db.query(`
                SELECT 
                    p.pekerjaan_id, p.nama_pekerjaan,
                    sp.sub_id, sp.nama_sub,
                    r.rab_id, r.vol_kontrak, r.total, r.bobot_total
                FROM pekerjaan p
                JOIN sub_pekerjaan sp ON sp.pekerjaan_id = p.pekerjaan_id
                LEFT JOIN rab r ON r.sub_id = sp.sub_id
                WHERE p.proyek_id = ?
                ORDER BY p.pekerjaan_id, sp.sub_id
            `, [proyek_id]);

            res.json(rows);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Ambil jadwal berdasarkan proyek
    getJadwalByProyek: async (req, res) => {
        const { proyek_id } = req.params;
        try {
            const [rows] = await db.query(`
                SELECT 
                    j.jadwal_id, j.rab_id, j.minggu_ke, j.bobot_target,
                    r.bobot_total,
                    sp.nama_sub,
                    p.nama_pekerjaan
                FROM jadwal j
                JOIN rab r ON r.rab_id = j.rab_id
                JOIN sub_pekerjaan sp ON sp.sub_id = r.sub_id
                JOIN pekerjaan p ON p.pekerjaan_id = sp.pekerjaan_id
                WHERE p.proyek_id = ?
                ORDER BY p.pekerjaan_id ASC, sp.sub_id ASC, j.minggu_ke ASC
            `, [proyek_id]);

            res.json(rows);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Status proyek (FIX: sebelumnya tidak ada)
    // Status proyek (Mengambil status_rab asli dari tabel proyek)
getStatusProyek: async (req, res) => {
    const { proyek_id } = req.params;
    try {
        const [rows] = await db.query(`
            SELECT 
                status_rab, 
                nama_proyek,
                (SELECT COUNT(*) FROM jadwal j 
                 JOIN rab r ON j.rab_id = r.rab_id 
                 JOIN sub_pekerjaan sp ON r.sub_id = sp.sub_id 
                 JOIN pekerjaan pk ON sp.pekerjaan_id = pk.pekerjaan_id 
                 WHERE pk.proyek_id = p.proyek_id) as total_jadwal
            FROM proyek p
            WHERE p.proyek_id = ?
        `, [proyek_id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Proyek tidak ditemukan" });
        }

        res.json(rows[0]); // Mengembalikan { status_rab: 'approve', total_jadwal: 5, ... }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
},

    // Simpan jadwal otomatis
    saveJadwalOtomatis: async (req, res) => {
        const { rab_id, minggu_mulai, minggu_selesai } = req.body;

        try {
            const start = parseInt(minggu_mulai);
            const end = parseInt(minggu_selesai);

            await db.query(`DELETE FROM jadwal WHERE rab_id = ?`, [rab_id]);

            const [rab] = await db.query(
                `SELECT vol_kontrak, bobot_total FROM rab WHERE rab_id = ?`,
                [rab_id]
            );

            const durasi = (end - start) + 1;
            const volPer = rab[0].vol_kontrak / durasi;
            const bobotPer = rab[0].bobot_total / durasi;

            const insertData = [];

            for (let i = start; i <= end; i++) {
                insertData.push([rab_id, i, volPer, bobotPer]);
            }

            await db.query(`
                INSERT INTO jadwal (rab_id, minggu_ke, vol_target, bobot_target)
                VALUES ?
            `, [insertData]);

            res.json({ message: "OK" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default jadwalController;