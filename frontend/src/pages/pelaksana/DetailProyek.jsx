import {
  Tabs,
  Tab
} from "react-bootstrap";

import {
  useParams
} from "react-router-dom";

import Rab from "./Rab";
import Jadwal from "./Jadwal";
import Realisasi from "./Realisasi";

const DetailProyek = () => {

  const {
    id
  } = useParams();

  return (
    <div>

      <div className="mb-4">

        <h3 className="mb-1">
          Detail Proyek
        </h3>

        <p className="text-muted">
          Monitoring proyek lapangan
        </p>

      </div>

      <Tabs defaultActiveKey="rab">

        <Tab
          eventKey="rab"
          title="RAB"
        >

          <div className="mt-4">

            <Rab proyekId={id} />

          </div>

        </Tab>

        <Tab
          eventKey="jadwal"
          title="Jadwal"
        >

          <div className="mt-4">

            <Jadwal proyekId={id} />

          </div>

        </Tab>

        <Tab
          eventKey="realisasi"
          title="Realisasi"
        >

          <div className="mt-4">

            <Realisasi proyekId={id} />

          </div>

        </Tab>

      </Tabs>

    </div>
  );

};

export default DetailProyek;