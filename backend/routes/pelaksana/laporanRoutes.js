import express from "express";
import laporanController from "../../controllers/laporanController.js";
import { isAuth, checkRole } from "../../middleware/auth.js"; // Asumsi middleware Anda

const router = express.Router();

// Route untuk mendapatkan struktur RAB (Breakdown) berdasarkan ID Proyek
router.get("/form/:proyek_id", isAuth, checkRole("pelaksana"), laporanController.getFormLaporan);

// Route untuk submit laporan mingguan (Header + Detail)
router.post("/submit", isAuth, checkRole("pelaksana"), laporanController.storeLaporanDanRealisasi);

export default router;