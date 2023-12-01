import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { fromUnixTime, format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import DataState from "modules/data/DataState";
import ProjectsState from "../projects/ProjectsState";
import { CHART_COLORS } from "../data/DataState";

const ProjectChart = () => {
  /**
   * REDUX DATA
   **/
  const data = useSelector(DataState.selectors.getData);
  const selectedProject = useSelector(
    ProjectsState.selectors.getSelectedProject
  );
  const [startTime, endTime] = useSelector(DataState.selectors.getRange);

  /**
   * RENDER
   **/

  const filteredData = selectedProject
    ? data.filter((d) => d.project_id === selectedProject)
    : data;

  return (
    <div style={{ position: "relative" }}>
      <ResponsiveContainer width="100%" aspect={3.5 / 1.0}>
        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(tick) => {
              return format(fromUnixTime(tick), "MM/dd hh:mm:aa");
            }}
            scale="time"
            type="number"
            domain={[startTime || "dataMin", endTime || "dataMax"]}
            allowDataOverflow={true}
            tickCount={6}
            label={{ value: "Time", position: "insideBottom", dy: 15 }}
          />
          <YAxis
            type="number"
            domain={[-20, 1200]}
            tickCount={12}
            label={{ value: "Value", angle: -90, position: "insideLeft" }}
          />

          <CartesianGrid strokeDasharray="12 6" />
          <Tooltip
            labelFormatter={(label) =>
              format(fromUnixTime(label), "MM/dd hh:mm:aa")
            }
          />

          {filteredData.map((cs, i) => (
            <Line
              key={i}
              data={cs.series}
              dataKey={"value"}
              stroke={CHART_COLORS[cs.project_id - 1]}
              type="monotone"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      {_.isEmpty(filteredData) && <div className="no-data-chart">No data</div>}
    </div>
  );
};

export default ProjectChart;
