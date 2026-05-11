import {
  Modal,
  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";

const JadwalModal = ({
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
    >

      <Modal.Header closeButton>

        <Modal.Title>
          Form Jadwal
        </Modal.Title>

      </Modal.Header>

      <Form onSubmit={handleSubmit}>

        <Modal.Body>

          <Row>

            <Col md={6}>

              <Form.Group className="mb-3">

                <Form.Label>
                  Minggu Ke
                </Form.Label>

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

                <Form.Label>
                  Volume
                </Form.Label>

                <Form.Control
                  type="number"
                  name="vol_rencana"
                  value={form.vol_rencana}
                  onChange={handleChange}
                />

              </Form.Group>

            </Col>

          </Row>

          <Form.Group>

            <Form.Label>
              Bobot
            </Form.Label>

            <Form.Control
              type="number"
              name="bobot_rencana"
              value={form.bobot_rencana}
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

export default JadwalModal;