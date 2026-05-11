import {
  getPekerjaanByProyek,
  createPekerjaan,
  updatePekerjaan,
  deletePekerjaan
} from "../models/pekerjaanModel.js";

export const index = async (req, res) => {
  try {

    const pekerjaan =
      await getPekerjaanByProyek(
        req.params.proyekId
      );

    res.status(200).json({
      success: true,
      data: pekerjaan
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

    await createPekerjaan(req.body);

    res.status(201).json({
      success: true,
      message: "Pekerjaan berhasil ditambahkan"
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

    await updatePekerjaan(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Pekerjaan berhasil diupdate"
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

    await deletePekerjaan(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Pekerjaan berhasil dihapus"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};