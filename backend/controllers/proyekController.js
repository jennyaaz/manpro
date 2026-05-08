// controllers/proyekController.js

import db from "../config/db.js";

// ====================== GET ALL ======================
export const getProyek = async (req, res) => {
  try {
    const query = `
      SELECT p.*, k.nama_klien
      FROM proyek p
      LEFT JOIN klien k ON p.klien_id = k.klien_id
    `;

    const [results] = await db.query(query);
    return res.status(200).json(results);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ====================== GET BY ID ======================
export const getProyekById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM proyek WHERE proyek_id = ?`;
    const [results] = await db.query(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Proyek tidak ditemukan" });
    }

    return res.status(200).json(results[0]);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ====================== CREATE ======================
export const createProyek = async (req, res) => {
  try {
    const {
      klien_id,
      nama_proyek,
      lokasi,
      tahun, // Menggantikan tanggal_mulai & selesai
    } = req.body;

    // Logic file_spk dihapus karena tidak lagi digunakan

    const query = `
      INSERT INTO proyek 
      (klien_id, nama_proyek, lokasi, tahun, status)
      VALUES (?, ?, ?, ?, 'draft')
    `;

    const values = [
      klien_id,
      nama_proyek,
      lokasi,
      tahun,
    ];

    const [result] = await db.query(query, values);

    return res.status(201).json({
      message: "Proyek berhasil ditambahkan",
      id: result.insertId,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ====================== UPDATE ======================
export const updateProyek = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      klien_id,
      nama_proyek,
      lokasi,
      tahun, // Menggantikan tanggal_mulai & selesai
      status,
    } = req.body;

    const query = `
      UPDATE proyek SET
        klien_id = ?,
        nama_proyek = ?,
        lokasi = ?,
        tahun = ?,
        status = ?
      WHERE proyek_id = ?
    `;

    const values = [
      klien_id,
      nama_proyek,
      lokasi,
      tahun,
      status,
      id
    ];

    await db.query(query, values);

    return res.status(200).json({
      message: "Proyek berhasil diupdate",
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ====================== DELETE ======================
export const deleteProyek = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM proyek WHERE proyek_id = ?`;

    await db.query(query, [id]);

    return res.status(200).json({
      message: "Proyek berhasil dihapus",
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ====================== PM VIEW ======================
export const getProyekPM = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.proyek_id,
        p.nama_proyek,
        p.tahun,
        p.status,
        k.nama_klien
      FROM proyek p
      LEFT JOIN klien k ON p.klien_id = k.klien_id
    `;

    const [results] = await db.query(query);
    return res.status(200).json(results);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};