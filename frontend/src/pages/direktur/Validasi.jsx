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

const Validasi = () => {

  const [proyek, setProyek] =
    useState([]);

  const getData = async () => {

    try {

      const response =
        await api.get("/proyek");

      setProyek(response.data.data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getData();
  }, []);

  const approve = async (id) => {

    try {

      await api.put(
        `/validasi/approve/${id}`
      );

      getData();

    } catch (error) {
      console.log(error);
    }

  };

  const reject = async (id) => {

    const catatan =
      prompt(
        "Catatan revisi"
      );

    if (!catatan) return;

    try {

      await api.put(
        `/validasi/reject/${id}`,
        {
          catatan_revisi:
            catatan
        }
      );

      getData();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>

      <h3 className="mb-4">
        Validasi Proyek
      </h3>

      <Table bordered hover>

        <thead>

          <tr>
            <th>Proyek</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>

        </thead>

        <tbody>

          {
            proyek.map((item) => (
              <tr key={item.proyek_id}>

                <td>
                  {item.nama_proyek}
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

                <td>

                  <Button
                    size="sm"
                    variant="success"
                    className="me-2"
                    onClick={() =>
                      approve(item.proyek_id)
                    }
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      reject(item.proyek_id)
                    }
                  >
                    Reject
                  </Button>

                </td>

              </tr>
            ))
          }

        </tbody>

      </Table>

    </div>
  );

};

export default Validasi;