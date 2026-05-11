import {
  Modal,
  Form,
  Button
} from "react-bootstrap";

const KlienModal = ({
  show,
  handleClose,
  handleSubmit,
  handleChange,
  form
}) => {
  return (
    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Form Klien</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>

        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Nama Klien</Form.Label>

            <Form.Control
              type="text"
              name="nama_klien"
              value={form.nama_klien}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nama PIC</Form.Label>

            <Form.Control
              type="text"
              name="nama_pic"
              value={form.nama_pic}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>No HP</Form.Label>

            <Form.Control
              type="text"
              name="no_hp"
              value={form.no_hp}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Alamat</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
            />
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

export default KlienModal;