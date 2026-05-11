import {
  useEffect,
  useState
} from "react";

import {
  Row,
  Col,
  Button
} from "react-bootstrap";

import api from "../../api/axios";

import UsersTable
from "../../components/tables/UsersTable";

import UserModal
from "../../components/modals/UserModal";

const Users = () => {

  const [users, setUsers] =
    useState([]);

  const [show, setShow] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [form, setForm] =
    useState({
      nama: "",
      username: "",
      password: "",
      role: "admin",
      email: ""
    });

  const getUsers = async () => {

    try {

      const response =
        await api.get("/users");

      setUsers(response.data.data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };

  const handleTambah = () => {

    setEditId(null);

    setForm({
      nama: "",
      username: "",
      password: "",
      role: "admin",
      email: ""
    });

    setShow(true);

  };

  const handleEdit = (user) => {

    setEditId(user.user_id);

    setForm({
      nama: user.nama,
      username: user.username,
      password: "",
      role: user.role,
      email: user.email
    });

    setShow(true);

  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Hapus user?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/users/${id}`
      );

      getUsers();

    } catch (error) {
      console.log(error);
    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await api.put(
          `/users/${editId}`,
          form
        );

      } else {

        await api.post(
          "/users",
          form
        );

      }

      setShow(false);

      getUsers();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>

      <Row className="mb-3">

        <Col>
          <h3>
            Data Users
          </h3>
        </Col>

        <Col className="text-end">

          <Button
            onClick={handleTambah}
          >
            Tambah User
          </Button>

        </Col>

      </Row>

      <UsersTable
        users={users}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <UserModal
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
        editId={editId}
      />

    </div>
  );

};

export default Users;