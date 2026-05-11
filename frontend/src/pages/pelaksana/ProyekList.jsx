import {
  useEffect,
  useState
} from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Badge
} from "react-bootstrap";

import {
  useNavigate
} from "react-router-dom";

import api from "../../api/axios";

const ProyekList = () => {

  const navigate = useNavigate();

  const [proyek, setProyek] =
    useState([]);

  const getProyek = async () => {

    try {

      const response =
        await api.get("/proyek");

      setProyek(
        response.data.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    getProyek();
  }, []);

  return (
    <div>

      <div className="mb-4">

        <h3 className="mb-1">
          List Proyek
        </h3>

        <p className="text-muted">
          Monitoring progres proyek
        </p>

      </div>

      <Row>

        {
          proyek.map((item) => (

            <Col
              md={4}
              key={item.proyek_id}
            >

              <Card className="shadow-sm border-0 mb-4">

                <Card.Body>

                  <div className="d-flex justify-content-between mb-3">

                    <Badge bg="primary">

                      {item.status_rab}

                    </Badge>

                    <small>

                      {item.tahun}

                    </small>

                  </div>

                  <h5>

                    {item.nama_proyek}

                  </h5>

                  <p className="text-muted mb-2">

                    {item.nama_klien}

                  </p>

                  <p className="small">

                    {item.lokasi}

                  </p>

                  <Button
                    className="w-100"
                    onClick={() =>
                      navigate(
                        `/pelaksana/proyek/${item.proyek_id}`
                      )
                    }
                  >
                    Detail Proyek
                  </Button>

                </Card.Body>

              </Card>

            </Col>

          ))
        }

      </Row>

    </div>
  );

};

export default ProyekList;