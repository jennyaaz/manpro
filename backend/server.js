import express from "express";
import session from "express-session";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/admin/userRoutes.js"
import klienRoutes from "./routes/admin/klienRoutes.js";
import proyekRoutes from "./routes/admin/proyekRoutes.js";
import pmProyekRoutes from "./routes/pm/pmProyekRoutes.js";
import pekerjaanRoutes from "./routes/pm/pekerjaanRoutes.js";
import subRoutes from "./routes/pm/subRoutes.js";
import rabRoutes from "./routes/pm/rabRoutes.js";
import jadwalRoutes from "./routes/pm/jadwalRoutes.js";
import validasiRoutes from "./routes/direktur/validasiRoutes.js";
import pelaksanaLaporanRoutes from './routes/pelaksana/laporanRoutes.js';


const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(session({
  secret: "manpro_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false // true kalau https
  }
}));

app.use("/api/auth", authRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/admin/klien", klienRoutes);
app.use("/api/admin/proyek", proyekRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/pm/proyek", pmProyekRoutes);
app.use("/api/pm/pekerjaan", pekerjaanRoutes);
app.use("/api/pm/sub", subRoutes);
app.use("/api/pm/rab", rabRoutes);
app.use("/api/pm/jadwal", jadwalRoutes);
app.use("/api/direktur", validasiRoutes);
app.use('/api/pelaksana/laporan', pelaksanaLaporanRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});