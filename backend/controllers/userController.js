import bcrypt from "bcrypt";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../models/userModel.js";

export const index = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const show = async (req, res) => {
  try {
    const user = await getUserById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const store = async (req, res) => {
  try {
    const {
      nama,
      username,
      password,
      role,
      email
    } = req.body;

    if (
      !nama ||
      !username ||
      !password ||
      !role ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi"
      });
    }

    const hashPassword = await bcrypt.hash(
      password,
      10
    );

    await createUser({
      nama,
      username,
      password: hashPassword,
      role,
      email
    });

    res.status(201).json({
      success: true,
      message: "User berhasil ditambahkan"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    await updateUser(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "User berhasil diupdate"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const destroy = async (req, res) => {
  try {
    await deleteUser(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "User berhasil dihapus"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};