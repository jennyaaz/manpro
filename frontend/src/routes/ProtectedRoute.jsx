import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

const ProtectedRoute = ({
  children,
  roles
}) => {

  const {
    user,
    loading
  } = useAuth();

  if (loading) {

    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" />
      </div>
    );

  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;

};

export default ProtectedRoute;