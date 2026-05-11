import express from "express";
import cors from "cors";

import sessionConfig from "./config/session.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import klienRoutes from "./routes/klienRoutes.js";
import proyekRoutes from "./routes/proyekRoutes.js";
import pekerjaanRoutes from "./routes/pekerjaanRoutes.js";
import subRoutes from "./routes/subRoutes.js";
import rabRoutes from "./routes/rabRoutes.js";
import jadwalRoutes from "./routes/jadwalRoutes.js";
import realisasiRoutes from "./routes/realisasiRoutes.js";
import validasiRoutes from "./routes/validasiRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use(sessionConfig);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/klien", klienRoutes);
app.use("/api/proyek", proyekRoutes);
app.use("/api/pekerjaan", pekerjaanRoutes);
app.use("/api/sub", subRoutes);
app.use("/api/rab", rabRoutes);
app.use("/api/jadwal", jadwalRoutes);
app.use("/api/realisasi", realisasiRoutes);
app.use("/api/validasi", validasiRoutes);

export default app;