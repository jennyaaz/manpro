import {
  approveProyek,
  rejectProyek
} from "../models/validasiModel.js";

export const approve = async (
  req,
  res
) => {

  try {

    await approveProyek(
      req.params.proyekId
    );

    res.status(200).json({
      success: true,
      message: "Proyek berhasil diapprove"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const reject = async (
  req,
  res
) => {

  try {

    await rejectProyek(
      req.params.proyekId,
      req.body.catatan_revisi
    );

    res.status(200).json({
      success: true,
      message: "Proyek berhasil direject"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};