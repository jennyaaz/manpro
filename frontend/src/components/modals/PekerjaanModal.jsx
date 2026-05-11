import {
  Modal,
  Form,
  Button
} from "react-bootstrap";

const PekerjaanModal = ({
  show,
  handleClose,
  handleSubmit,
  handleChange,
  form
}) => {
  return (
    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Form Pekerjaan</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>

        <Modal.Body>

          <Form.Group>
            <Form.Label>Nama Pekerjaan</Form.Label>

            <Form.Control
              type="text"
              name="nama_pekerjaan"
              value={form.nama_pekerjaan}
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

export default PekerjaanModal;