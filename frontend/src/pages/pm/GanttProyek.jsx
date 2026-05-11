import {
  useEffect,
  useState
} from "react";

import {
  Gantt,
  ViewMode
} from "gantt-task-react";

import api from "../../api/axios";

const GanttProyek = () => {

  const [tasks, setTasks] =
    useState([]);

  const getData = async () => {

    try {

      const response =
        await api.get(
          "/jadwal/1"
        );

      const jadwal =
        response.data.data;

      const ganttData =
        jadwal.map((item) => {

          const start =
            new Date(
              2026,
              0,
              item.minggu_ke * 7
            );

          const end =
            new Date(
              2026,
              0,
              item.minggu_ke * 7 + 6
            );

          return {
            id: String(item.jadwal_id),
            name:
              `Minggu ${item.minggu_ke}`,
            start,
            end,
            progress:
              item.bobot_rencana,
            type: "task"
          };

        });

      setTasks(ganttData);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>

      <h3 className="mb-4">
        Gantt Chart Proyek
      </h3>

      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Week}
      />

    </div>
  );

};

export default GanttProyek;