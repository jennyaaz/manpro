// backend\routes\pm\jadwalRoutes.js
import express from 'express';
import jadwalController from '../../controllers/jadwalController.js';

const router = express.Router();

// 1. Letakkan yang spesifik di ATAS
router.get('/status/:proyek_id', jadwalController.getStatusProyek);

// 2. Letakkan yang menggunakan parameter umum (/:id) di BAWAH
router.get('/:proyek_id', jadwalController.getJadwalByProyek);

// 3. POST
router.post('/save', jadwalController.saveJadwalOtomatis);

export default router;