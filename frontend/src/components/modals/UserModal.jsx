import {
  Modal,
  Form,
  Button
} from "react-bootstrap";

const UserModal = ({
  show,
  handleClose,
  handleSubmit,
  handleChange,
  form,
  editId
}) => {
  return (
    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>
          {editId ? "Edit User" : "Tambah User"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>

        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Nama</Form.Label>

            <Form.Control
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>

            <Form.Control
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </Form.Group>

          {!editId && (
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Role</Form.Label>

            <Form.Select
              name="role"
              value={form.role}
              onChange={handleChange}
            >

              <option value="admin">
                Admin
              </option>

              <option value="pm">
                PM
              </option>

              <option value="pelaksana">
                Pelaksana
              </option>

              <option value="direktur">
                Direktur
              </option>

            </Form.Select>

          </Form.Group>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Tutup
          </Button>

          <Button type="submit">
            Simpan
          </Button>

        </Modal.Footer>

      </Form>

    </Modal>
  );
};

export default UserModal;