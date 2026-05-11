import {
  useEffect,
  useState
} from "react";

import {
  Table,
  Button
} from "react-bootstrap";

import api from "../../api/axios";

import RealisasiModal
from "../../components/modals/RealisasiModal";

const Realisasi = () => {

  const [realisasi, setRealisasi] =
    useState([]);

  const [show, setShow] =
    useState(false);

  const [form, setForm] =
    useState({
      rab_id: 1,
      minggu_ke: "",
      tanggal: "",
      vol_realisasi: "",
      bobot_realisasi: "",
      progres: "",
      catatan: ""
    });

  const getData = async () => {

    try {

      const response =
        await api.get(
          "/realisasi/1"
        );

      setRealisasi(
        response.data.data
      );

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getData();
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
        "/realisasi",
        form
      );

      setShow(false);

      getData();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>

      <div className="d-flex justify-content-between mb-3">

        <h3>
          Realisasi Proyek
        </h3>

        <Button
          onClick={() => setShow(true)}
        >
          Input Realisasi
        </Button>

      </div>

      <Table bordered hover>

        <thead>

          <tr>
            <th>Minggu</th>
            <th>Tanggal</th>
            <th>Volume</th>
            <th>Bobot</th>
            <th>Progress</th>
          </tr>

        </thead>

        <tbody>

          {
            realisasi.map((item) => (
              <tr key={item.realisasi_id}>

                <td>
                  {item.minggu_ke}
                </td>

                <td>
                  {item.tanggal}
                </td>

                <td>
                  {item.vol_realisasi}
                </td>

                <td>
                  {item.bobot_realisasi}
                </td>

                <td>
                  {item.progres}
                </td>

              </tr>
            ))
          }

        </tbody>

      </Table>

      <RealisasiModal
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
      />

    </div>
  );

};

export default Realisasi;