import {
  Outlet,
  Link,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

const DirekturLayout = () => {

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
          width: "250px",
          minHeight: "100vh"
        }}
      >

        <h4>DIREKTUR PANEL</h4>

        <hr />

        <ul className="nav flex-column gap-2">

          <li>

            <Link
              to="/direktur/dashboard"
              className="text-white text-decoration-none"
            >
              Dashboard
            </Link>

          </li>

          <li>

            <Link
              to="/direktur/validasi"
              className="text-white text-decoration-none"
            >
              Validasi
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

export default DirekturLayout;