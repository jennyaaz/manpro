import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";

import AdminLayout from "../layouts/AdminLayout";
import PMLayout from "../layouts/PMLayout";
import PelaksanaLayout from "../layouts/PelaksanaLayout";
import DirekturLayout from "../layouts/DirekturLayout";

import AdminDashboard from "../pages/admin/Dashboard";
import PMDashboard from "../pages/pm/Dashboard";
import PelaksanaDashboard from "../pages/pelaksana/Dashboard";
import DirekturDashboard from "../pages/direktur/Dashboard";

import Users from "../pages/admin/Users";
import Klien from "../pages/admin/Klien";
import Proyek from "../pages/admin/Proyek";

import PMProyekList from "../pages/pm/ProyekList";
import PMDetailProyek from "../pages/pm/DetailProyek";
import GanttProyek from "../pages/pm/GanttProyek";

import PelaksanaProyekList from "../pages/pelaksana/ProyekList";
import PelaksanaDetailProyek from "../pages/pelaksana/DetailProyek";
import Realisasi from "../pages/pelaksana/Realisasi";

import Validasi from "../pages/direktur/Validasi";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="users"
            element={<Users />}
          />

          <Route
            path="klien"
            element={<Klien />}
          />

          <Route
            path="proyek"
            element={<Proyek />}
          />

        </Route>

        <Route
          path="/pm"
          element={
            <ProtectedRoute roles={["pm"]}>
              <PMLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<PMDashboard />}
          />

          <Route
            path="proyek"
            element={<PMProyekList />}
          />

          <Route
            path="proyek/:id"
            element={<PMDetailProyek />}
          />

          <Route
            path="gantt"
            element={<GanttProyek />}
          />

        </Route>

        <Route
          path="/pelaksana"
          element={
            <ProtectedRoute roles={["pelaksana"]}>
              <PelaksanaLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<PelaksanaDashboard />}
          />

          <Route
            path="proyek"
            element={<PelaksanaProyekList />}
          />

          <Route
            path="proyek/:id"
            element={<PelaksanaDetailProyek />}
          />

          <Route
            path="realisasi"
            element={<Realisasi />}
          />

        </Route>

        <Route
          path="/direktur"
          element={
            <ProtectedRoute roles={["direktur"]}>
              <DirekturLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<DirekturDashboard />}
          />

          <Route
            path="validasi"
            element={<Validasi />}
          />

        </Route>

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;