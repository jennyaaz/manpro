import {
  useEffect,
  useState
} from "react";

import {
  Table,
  Button
} from "react-bootstrap";

import api from "../../api/axios";

import PekerjaanModal
from "../../components/modals/PekerjaanModal";

const Pekerjaan = ({
  proyekId
}) => {

  const [pekerjaan, setPekerjaan] =
    useState([]);

  const [show, setShow] =
    useState(false);

  const [form, setForm] =
    useState({
      proyek_id: proyekId,
      nama_pekerjaan: ""
    });

  const getPekerjaan = async () => {

    try {

      const response =
        await api.get(
          `/pekerjaan/${proyekId}`
        );

      setPekerjaan(
        response.data.data
      );

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getPekerjaan();
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
        "/pekerjaan",
        form
      );

      setShow(false);

      getPekerjaan();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>

      <div className="d-flex justify-content-between mb-3">

        <h5>
          Data Pekerjaan
        </h5>

        <Button
          onClick={() => setShow(true)}
        >
          Tambah
        </Button>

      </div>

      <Table bordered hover>

        <thead>

          <tr>
            <th>No</th>
            <th>Pekerjaan</th>
            <th>Jumlah Sub</th>
          </tr>

        </thead>

        <tbody>

          {
            pekerjaan.map((item, index) => (
              <tr key={item.pekerjaan_id}>

                <td>
                  {index + 1}
                </td>

                <td>
                  {item.nama_pekerjaan}
                </td>

                <td>
                  {item.jumlah_sub}
                </td>

              </tr>
            ))
          }

        </tbody>

      </Table>

      <PekerjaanModal
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
      />

    </div>
  );

};

export default Pekerjaan;