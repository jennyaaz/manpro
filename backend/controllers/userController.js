import db from "../config/db.js";

/* ================= GET USER ================= */
export const getUser = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("GET USER ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
};

/* ================= CREATE USER ================= */
export const createUser = async (req, res) => {
  try {
    const { nama, username, password, role, email } = req.body;

    if (!nama || !username || !password || !role) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    await db.query(
      "INSERT INTO users (nama, username, password, role, email) VALUES (?,?,?,?,?)",
      [nama, username, password, role, email]
    );

    res.json({ message: "User ditambah" });
  } catch (err) {
    console.error("CREATE USER ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
};

/* ================= UPDATE USER ================= */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, username, password, role, email } = req.body;

    await db.query(
      `UPDATE users 
       SET nama=?, username=?, password=?, role=?, email=? 
       WHERE user_id=?`,
      [nama, username, password, role, email, id]
    );

    res.json({ message: "User diupdate" });
  } catch (err) {
    console.error("UPDATE USER ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
};

/* ================= DELETE USER ================= */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM users WHERE user_id=?", [id]);

    res.json({ message: "User dihapus" });
  } catch (err) {
    console.error("DELETE USER ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
};