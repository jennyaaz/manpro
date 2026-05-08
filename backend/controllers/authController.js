import db from "../config/db.js";

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    username = username?.trim();
    password = password?.trim();

    if (!username || !password) {
      return res.status(400).json({
        message: "Username dan password wajib diisi",
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Username tidak ditemukan",
      });
    }

    const user = rows[0];

    if (password !== user.password) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    req.session.user = {
      id: user.user_id,
      nama: user.nama,
      role: user.role,
    };

    return res.json({
      message: "Login berhasil",
      user: req.session.user,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ================= ME ================= */
export const me = (req, res) => {
  try {
    if (!req.session?.user) {
      return res.status(401).json({
        message: "Belum login",
      });
    }

    res.json(req.session.user);
  } catch (err) {
    console.error("ME ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGOUT ================= */
export const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("LOGOUT ERROR:", err);
        return res.status(500).json({
          message: "Gagal logout",
        });
      }

      res.json({
        message: "Logout berhasil",
      });
    });
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};