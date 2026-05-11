import {
  useEffect,
  useState
} from "react";

import {
  Table,
  Button
} from "react-bootstrap";

import api from "../../api/axios";

import RabModal
from "../../components/modals/RabModal";

const Rab = () => {

  const [rab, setRab] =
    useState([]);

  const [show, setShow] =
    useState(false);

  const [form, setForm] =
    useState({
      sub_id: "",
      uraian: "",
      vol_kontrak: "",
      satuan: "",
      harga_satuan: "",
      bobot: ""
    });

  const getRab = async () => {

    try {

      const response =
        await api.get(
          "/rab/sub/1"
        );

      setRab(response.data.data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getRab();
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
        "/rab",
        form
      );

      setShow(false);

      getRab();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>

      <div className="d-flex justify-content-between mb-3">

        <h5>
          Data RAB
        </h5>

        <Button
          onClick={() => setShow(true)}
        >
          Tambah RAB
        </Button>

      </div>

      <Table bordered hover>

        <thead>

          <tr>
            <th>Uraian</th>
            <th>Volume</th>
            <th>Satuan</th>
            <th>Harga</th>
            <th>Total</th>
            <th>Bobot</th>
          </tr>

        </thead>

        <tbody>

          {
            rab.map((item) => (
              <tr key={item.rab_id}>

                <td>
                  {item.uraian}
                </td>

                <td>
                  {item.vol_kontrak}
                </td>

                <td>
                  {item.satuan}
                </td>

                <td>
                  {item.harga_satuan}
                </td>

                <td>
                  {item.total}
                </td>

                <td>
                  {item.bobot}
                </td>

              </tr>
            ))
          }

        </tbody>

      </Table>

      <RabModal
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
      />

    </div>
  );

};

export default Rab;