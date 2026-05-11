import {
  getAllProyek,
  getProyekById,
  createProyek,
  updateProyek,
  deleteProyek
} from "../models/proyekModel.js";

export const index = async (req, res) => {
  try {

    const proyek = await getAllProyek();

    res.status(200).json({
      success: true,
      data: proyek
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

    const proyek = await getProyekById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: proyek
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

    await createProyek(req.body);

    res.status(201).json({
      success: true,
      message: "Proyek berhasil ditambahkan"
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

    await updateProyek(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Proyek berhasil diupdate"
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

    await deleteProyek(req.params.id);

    res.status(200).json({
      success: true,
      message: "Proyek berhasil dihapus"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};