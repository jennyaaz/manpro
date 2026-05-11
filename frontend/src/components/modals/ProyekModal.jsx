import {
  Modal,
  Form,
  Button
} from "react-bootstrap";

const ProyekModal = ({
  show,
  handleClose,
  handleSubmit,
  handleChange,
  form,
  klien
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
    >

      <Modal.Header closeButton>
        <Modal.Title>Form Proyek</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>

        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Klien</Form.Label>

            <Form.Select
              name="klien_id"
              value={form.klien_id}
              onChange={handleChange}
            >

              <option value="">
                Pilih Klien
              </option>

              {klien.map((item) => (
                <option
                  key={item.klien_id}
                  value={item.klien_id}
                >
                  {item.nama_klien}
                </option>
              ))}

            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nama Proyek</Form.Label>

            <Form.Control
              type="text"
              name="nama_proyek"
              value={form.nama_proyek}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lokasi</Form.Label>

            <Form.Control
              type="text"
              name="lokasi"
              value={form.lokasi}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tahun</Form.Label>

            <Form.Control
              type="number"
              name="tahun"
              value={form.tahun}
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

export default ProyekModal;