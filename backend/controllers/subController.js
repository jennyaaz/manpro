import {
  getSubByPekerjaan,
  createSub,
  updateSub,
  deleteSub
} from "../models/subModel.js";

export const index = async (req, res) => {
  try {

    const sub =
      await getSubByPekerjaan(
        req.params.pekerjaanId
      );

    res.status(200).json({
      success: true,
      data: sub
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

    await createSub(req.body);

    res.status(201).json({
      success: true,
      message: "Sub pekerjaan berhasil ditambahkan"
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

    await updateSub(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Sub pekerjaan berhasil diupdate"
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

    await deleteSub(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Sub pekerjaan berhasil dihapus"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};