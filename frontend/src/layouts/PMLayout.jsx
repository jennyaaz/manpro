import {
  Outlet,
  Link,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

const PMLayout = () => {

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

        <h4>PM PANEL</h4>

        <hr />

        <ul className="nav flex-column gap-2">

          <li>

            <Link
              to="/pm/dashboard"
              className="text-white text-decoration-none"
            >
              Dashboard
            </Link>

          </li>

          <li>

            <Link
              to="/pm/proyek"
              className="text-white text-decoration-none"
            >
              List Proyek
            </Link>

          </li>

          <li>

            <Link
              to="/pm/gantt"
              className="text-white text-decoration-none"
            >
              Gantt Chart
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

export default PMLayout;