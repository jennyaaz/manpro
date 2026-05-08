import express from "express";
const router = express.Router();

// Perhatikan: Menghapus "/direktur" karena filenya ada di luar
import { getListRab, updateValidasiRab } from "../../controllers/validasiController.js";

// Ambil semua list proyek dan total RAB-nya
router.get("/list-rab", getListRab);

// Update status (Approve/Reject)
router.put("/validasi/:proyekId", updateValidasiRab);

export default router;