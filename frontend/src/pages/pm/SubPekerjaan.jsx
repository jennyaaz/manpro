import {
  useEffect,
  useState
} from "react";

import {
  Table,
  Button
} from "react-bootstrap";

import api from "../../api/axios";

import SubModal
from "../../components/modals/SubModal";

const SubPekerjaan = ({
  pekerjaanId
}) => {

  const [sub, setSub] =
    useState([]);

  const [show, setShow] =
    useState(false);

  const [form, setForm] =
    useState({
      pekerjaan_id: pekerjaanId,
      nama_sub: ""
    });

  const getSub = async () => {

    try {

      const response =
        await api.get(
          `/sub/${pekerjaanId}`
        );

      setSub(response.data.data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getSub();
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
        "/sub",
        form
      );

      setShow(false);

      getSub();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>

      <div className="d-flex justify-content-between mb-3">

        <h5>
          Sub Pekerjaan
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
            <th>Nama Sub</th>
          </tr>

        </thead>

        <tbody>

          {
            sub.map((item, index) => (
              <tr key={item.sub_id}>

                <td>
                  {index + 1}
                </td>

                <td>
                  {item.nama_sub}
                </td>

              </tr>
            ))
          }

        </tbody>

      </Table>

      <SubModal
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
      />

    </div>
  );

};

export default SubPekerjaan;