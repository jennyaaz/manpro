import {
  Modal,
  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";

const RabModal = ({
  show,
  handleClose,
  handleSubmit,
  handleChange,
  form
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
    >

      <Modal.Header closeButton>
        <Modal.Title>Form RAB</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>

        <Modal.Body>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Uraian</Form.Label>

                <Form.Control
                  type="text"
                  name="uraian"
                  value={form.uraian}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Volume</Form.Label>

                <Form.Control
                  type="number"
                  name="vol_kontrak"
                  value={form.vol_kontrak}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Satuan</Form.Label>

                <Form.Control
                  type="text"
                  name="satuan"
                  value={form.satuan}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Harga Satuan</Form.Label>

                <Form.Control
                  type="number"
                  name="harga_satuan"
                  value={form.harga_satuan}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Bobot</Form.Label>

                <Form.Control
                  type="number"
                  name="bobot"
                  value={form.bobot}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>

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

export default RabModal;