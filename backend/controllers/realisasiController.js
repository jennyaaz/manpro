import {
  getRealisasiByRab,
  createRealisasi,
  updateRealisasi,
  deleteRealisasi,
  getProgressByRab
} from "../models/realisasiModel.js";

export const index = async (
  req,
  res
) => {

  try {

    const realisasi =
      await getRealisasiByRab(
        req.params.rabId
      );

    res.status(200).json({
      success: true,
      data: realisasi
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const progress = async (
  req,
  res
) => {

  try {

    const progressData =
      await getProgressByRab(
        req.params.rabId
      );

    res.status(200).json({
      success: true,
      data: progressData
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const store = async (
  req,
  res
) => {

  try {

    await createRealisasi(req.body);

    res.status(201).json({
      success: true,
      message: "Realisasi berhasil ditambahkan"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const update = async (
  req,
  res
) => {

  try {

    await updateRealisasi(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Realisasi berhasil diupdate"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const destroy = async (
  req,
  res
) => {

  try {

    await deleteRealisasi(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Realisasi berhasil dihapus"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};