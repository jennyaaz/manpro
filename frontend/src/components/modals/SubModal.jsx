import {
  Modal,
  Form,
  Button
} from "react-bootstrap";

const SubModal = ({
  show,
  handleClose,
  handleSubmit,
  handleChange,
  form
}) => {
  return (
    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Form Sub Pekerjaan</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>

        <Modal.Body>

          <Form.Group>
            <Form.Label>Nama Sub</Form.Label>

            <Form.Control
              type="text"
              name="nama_sub"
              value={form.nama_sub}
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

export default SubModal;