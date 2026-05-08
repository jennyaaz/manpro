import db from "../config/db.js";

// GET
export const getKlien = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM klien"
    );

    res.json(result);

  } catch (err) {
    return res.status(500).json(err);
  }
};

// CREATE
export const createKlien = async (req, res) => {
  try {
    const { nama_klien, nama_pic, no_hp, alamat } = req.body;

    await db.query(
      "INSERT INTO klien (nama_klien,nama_pic,no_hp,alamat) VALUES (?,?,?,?)",
      [nama_klien, nama_pic, no_hp, alamat]
    );

    res.json({
      message: "Klien ditambah"
    });

  } catch (err) {
    return res.status(500).json(err);
  }
};

// UPDATE
export const updateKlien = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_klien, nama_pic, no_hp, alamat } = req.body;

    await db.query(
      "UPDATE klien SET nama_klien=?, nama_pic=?, no_hp=?, alamat=? WHERE klien_id=?",
      [nama_klien, nama_pic, no_hp, alamat, id]
    );

    res.json({
      message: "Klien diupdate"
    });

  } catch (err) {
    return res.status(500).json(err);
  }
};

// DELETE
export const deleteKlien = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM klien WHERE klien_id=?",
      [id]
    );

    res.json({
      message: "Klien dihapus"
    });

  } catch (err) {
    return res.status(500).json(err);
  }
};