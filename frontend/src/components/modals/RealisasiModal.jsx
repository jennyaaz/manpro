import {
  Modal,
  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";

const RealisasiModal = ({
  show,
  handleClose,
  handleSubmit,
  handleChange,
  form
}) => {
  return (
    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Input Realisasi</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>

        <Modal.Body>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Minggu</Form.Label>

                <Form.Control
                  type="number"
                  name="minggu_ke"
                  value={form.minggu_ke}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tanggal</Form.Label>

                <Form.Control
                  type="date"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Volume Realisasi</Form.Label>

            <Form.Control
              type="number"
              name="vol_realisasi"
              value={form.vol_realisasi}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bobot Realisasi</Form.Label>

            <Form.Control
              type="number"
              name="bobot_realisasi"
              value={form.bobot_realisasi}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Progress</Form.Label>

            <Form.Control
              type="text"
              name="progres"
              value={form.progres}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Catatan</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              name="catatan"
              value={form.catatan}
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

export default RealisasiModal;