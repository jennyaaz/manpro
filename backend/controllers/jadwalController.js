import {
  getJadwalByRab,
  getTotalBobot,
  createJadwal,
  updateJadwal,
  deleteJadwal
} from "../models/jadwalModel.js";

export const index = async (
  req,
  res
) => {

  try {

    const jadwal =
      await getJadwalByRab(
        req.params.rabId
      );

    res.status(200).json({
      success: true,
      data: jadwal
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

    const totalBobot =
      await getTotalBobot(
        req.body.rab_id
      );

    const nextBobot =
      Number(totalBobot.total_bobot) +
      Number(req.body.bobot_rencana);

    if (nextBobot > 100) {
      return res.status(400).json({
        success: false,
        message: "Total bobot melebihi 100%"
      });
    }

    await createJadwal(req.body);

    res.status(201).json({
      success: true,
      message: "Jadwal berhasil ditambahkan"
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

    await updateJadwal(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Jadwal berhasil diupdate"
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

    await deleteJadwal(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Jadwal berhasil dihapus"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};