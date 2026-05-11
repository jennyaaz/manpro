import {
  useEffect,
  useState
} from "react";

import {
  Table,
  Button,
  Badge
} from "react-bootstrap";

import api from "../../api/axios";

import ProyekModal
from "../../components/modals/ProyekModal";

const Proyek = () => {

  const [proyek, setProyek] =
    useState([]);

  const [klien, setKlien] =
    useState([]);

  const [show, setShow] =
    useState(false);

  const [form, setForm] =
    useState({
      klien_id: "",
      nama_proyek: "",
      lokasi: "",
      tahun: ""
    });

  const getProyek = async () => {

    try {

      const response =
        await api.get("/proyek");

      setProyek(response.data.data);

    } catch (error) {
      console.log(error);
    }

  };

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

    getProyek();

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
        "/proyek",
        form
      );

      setShow(false);

      getProyek();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h3>
          Data Proyek
        </h3>

        <Button
          onClick={() => setShow(true)}
        >
          Tambah Proyek
        </Button>

      </div>

      <Table bordered hover>

        <thead>

          <tr>
            <th>No</th>
            <th>Nama Proyek</th>
            <th>Klien</th>
            <th>Lokasi</th>
            <th>Tahun</th>
            <th>Status RAB</th>
          </tr>

        </thead>

        <tbody>

          {
            proyek.map((item, index) => (
              <tr key={item.proyek_id}>

                <td>
                  {index + 1}
                </td>

                <td>
                  {item.nama_proyek}
                </td>

                <td>
                  {item.nama_klien}
                </td>

                <td>
                  {item.lokasi}
                </td>

                <td>
                  {item.tahun}
                </td>

                <td>

                  {
                    item.status_rab === "approve" && (
                      <Badge bg="success">
                        Approve
                      </Badge>
                    )
                  }

                  {
                    item.status_rab === "pending" && (
                      <Badge bg="warning">
                        Pending
                      </Badge>
                    )
                  }

                  {
                    item.status_rab === "reject" && (
                      <Badge bg="danger">
                        Reject
                      </Badge>
                    )
                  }

                </td>

              </tr>
            ))
          }

        </tbody>

      </Table>

      <ProyekModal
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
        klien={klien}
      />

    </div>
  );

};

export default Proyek;