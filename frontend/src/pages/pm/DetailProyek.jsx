import {
  Tabs,
  Tab
} from "react-bootstrap";

import {
  useParams
} from "react-router-dom";

import Pekerjaan from "./Pekerjaan";
import Rab from "./Rab";
import Jadwal from "./Jadwal";
import GanttProyek from "./GanttProyek";

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
          Manajemen proyek
        </p>

      </div>

      <Tabs defaultActiveKey="pekerjaan">

        <Tab
          eventKey="pekerjaan"
          title="Pekerjaan"
        >

          <div className="mt-4">

            <Pekerjaan
              proyekId={id}
            />

          </div>

        </Tab>

        <Tab
          eventKey="rab"
          title="RAB"
        >

          <div className="mt-4">

            <Rab
              proyekId={id}
            />

          </div>

        </Tab>

        <Tab
          eventKey="jadwal"
          title="Jadwal"
        >

          <div className="mt-4">

            <Jadwal
              proyekId={id}
            />

          </div>

        </Tab>

        <Tab
          eventKey="gantt"
          title="Gantt"
        >

          <div className="mt-4">

            <GanttProyek
              proyekId={id}
            />

          </div>

        </Tab>

      </Tabs>

    </div>
  );

};

export default DetailProyek;