import {
  useEffect,
  useState
} from "react";

import {
  Table,
  Button
} from "react-bootstrap";

import api from "../../api/axios";

import KlienModal
from "../../components/modals/KlienModal";

const Klien = () => {

  const [klien, setKlien] =
    useState([]);

  const [show, setShow] =
    useState(false);

  const [form, setForm] =
    useState({
      nama_klien: "",
      nama_pic: "",
      no_hp: "",
      alamat: ""
    });

  const getKlien = async () => {

    try {

      const response =
        await api.get("/klien");

      setKlien(response.data.data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getKlien();
  }, []);

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

      await api.post(
        "/klien",
        form
      );

      setShow(false);

      getKlien();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h3>
          Data Klien
        </h3>

        <Button
          onClick={() => setShow(true)}
        >
          Tambah Klien
        </Button>

      </div>

      <Table bordered hover>

        <thead>

          <tr>
            <th>No</th>
            <th>Nama Klien</th>
            <th>PIC</th>
            <th>No HP</th>
            <th>Alamat</th>
          </tr>

        </thead>

        <tbody>

          {
            klien.map((item, index) => (
              <tr key={item.klien_id}>

                <td>
                  {index + 1}
                </td>

                <td>
                  {item.nama_klien}
                </td>

                <td>
                  {item.nama_pic}
                </td>

                <td>
                  {item.no_hp}
                </td>

                <td>
                  {item.alamat}
                </td>

              </tr>
            ))
          }

        </tbody>

      </Table>

      <KlienModal
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
      />

    </div>
  );

};

export default Klien;