import { findUserByUsername }
from "../models/authModel.js";

export const login = async (
  req,
  res
) => {

  try {

    const {
      username,
      password
    } = req.body;

    if (
      !username ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Username dan password wajib diisi"
      });

    }

    const user =
      await findUserByUsername(
        username
      );

    if (!user) {

      return res.status(404).json({
        success: false,
        message:
          "User tidak ditemukan"
      });

    }

    if (
      password !== user.password
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Password salah"
      });

    }

    req.session.user = {

      user_id: user.user_id,

      nama: user.nama,

      username: user.username,

      role: user.role,

      email: user.email

    };

    res.status(200).json({

      success: true,

      message:
        "Login berhasil",

      data: req.session.user

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

export const logout = async (
  req,
  res
) => {

  try {

    req.session.destroy(() => {

      res.status(200).json({

        success: true,

        message:
          "Logout berhasil"

      });

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

export const me = async (
  req,
  res
) => {

  try {

    res.status(200).json({

      success: true,

      data: req.session.user

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};