import {
  Outlet,
  Link,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

const PelaksanaLayout = () => {

  const {
    user,
    logout
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {

    await logout();

    navigate("/login");

  };

  return (
    <div className="d-flex">

      <div
        className="bg-dark text-white p-3"
        style={{
          width: "260px",
          minHeight: "100vh"
        }}
      >

        <h4 className="mb-4">
          PELAKSANA PANEL
        </h4>

        <ul className="nav flex-column gap-3">

          <li>

            <Link
              to="/pelaksana/dashboard"
              className="text-white text-decoration-none"
            >
              Dashboard
            </Link>

          </li>

          <li>

            <Link
              to="/pelaksana/proyek"
              className="text-white text-decoration-none"
            >
              List Proyek
            </Link>

          </li>

        </ul>

      </div>

      <div className="flex-grow-1">

        <div className="border-bottom p-3 d-flex justify-content-between">

          <div>

            Login sebagai:
            {" "}
            <b>{user?.nama}</b>

          </div>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        <div className="p-4">

          <Outlet />

        </div>

      </div>

    </div>
  );

};

export default PelaksanaLayout;