import {
  useEffect,
  useState
} from "react";

import {
  Row,
  Col,
  Card,
  Button
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

      setProyek(response.data.data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getProyek();
  }, []);

  return (
    <div>

      <h3 className="mb-4">
        List Proyek
      </h3>

      <Row>

        {
          proyek.map((item) => (
            <Col
              md={4}
              key={item.proyek_id}
            >

              <Card className="shadow-sm mb-4">

                <Card.Body>

                  <h5>
                    {item.nama_proyek}
                  </h5>

                  <p className="mb-1">
                    {item.nama_klien}
                  </p>

                  <p className="mb-3">
                    {item.lokasi}
                  </p>

                  <Button
                    onClick={() =>
                      navigate(
                        `/pm/proyek/${item.proyek_id}`
                      )
                    }
                  >
                    Detail
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