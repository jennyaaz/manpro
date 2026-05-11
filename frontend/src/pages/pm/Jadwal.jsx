import {
  useEffect,
  useState
} from "react";

import {
  Table,
  Button
} from "react-bootstrap";

import api from "../../api/axios";

import JadwalModal
from "../../components/modals/JadwalModal";

const Jadwal = () => {

  const [jadwal, setJadwal] =
    useState([]);

  const [show, setShow] =
    useState(false);

  const [form, setForm] =
    useState({
      rab_id: 1,
      minggu_ke: "",
      vol_rencana: "",
      bobot_rencana: ""
    });

  const getJadwal = async () => {

    try {

      const response =
        await api.get(
          "/jadwal/1"
        );

      setJadwal(response.data.data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getJadwal();
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
        "/jadwal",
        form
      );

      setShow(false);

      getJadwal();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>

      <div className="d-flex justify-content-between mb-3">

        <h5>
          Data Jadwal
        </h5>

        <Button
          onClick={() => setShow(true)}
        >
          Tambah Jadwal
        </Button>

      </div>

      <Table bordered hover>

        <thead>

          <tr>
            <th>Minggu</th>
            <th>Volume</th>
            <th>Bobot</th>
          </tr>

        </thead>

        <tbody>

          {
            jadwal.map((item) => (
              <tr key={item.jadwal_id}>

                <td>
                  {item.minggu_ke}
                </td>

                <td>
                  {item.vol_rencana}
                </td>

                <td>
                  {item.bobot_rencana}
                </td>

              </tr>
            ))
          }

        </tbody>

      </Table>

      <JadwalModal
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
      />

    </div>
  );

};

export default Jadwal;