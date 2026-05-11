import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  Card,
  Form,
  Button,
  Alert
} from "react-bootstrap";

import {
  useAuth
} from "../../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const {
    login
  } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const response =
        await login(form);

      const role =
        response.data.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      }

      if (role === "pm") {
        navigate("/pm/dashboard");
      }

      if (role === "pelaksana") {
        navigate("/pelaksana/dashboard");
      }

      if (role === "direktur") {
        navigate("/direktur/dashboard");
      }

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login gagal"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

      <Card
        className="shadow"
        style={{
          width: "400px"
        }}
      >

        <Card.Body className="p-4">

          <h3 className="text-center mb-4">
            LOGIN SISTEM
          </h3>

          {
            error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )
          }

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">

              <Form.Label>
                Username
              </Form.Label>

              <Form.Control
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>
                Password
              </Form.Label>

              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />

            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {
                loading
                  ? "Loading..."
                  : "Login"
              }
            </Button>

          </Form>

        </Card.Body>

      </Card>

    </div>
  );

};

export default Login;