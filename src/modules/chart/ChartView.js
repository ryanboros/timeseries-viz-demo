import React from "react";
import { useSelector } from "react-redux";
import { Alert, Divider } from "antd";

import ProjectsChart from "./ProjectsChart";
import FilterBar from "./FilterBar";
import ProjectsState from "../projects/ProjectsState";
import DataState from "../data/DataState";

const ProjectView = () => {
  /**
   * REDUX DATA
   **/
  const projectError = useSelector(ProjectsState.selectors.getError);
  const dataError = useSelector(DataState.selectors.getError);

  /**
   * RENDER
   **/
  return (
    <div className="site-layout-content">
      {(projectError || dataError) && (
        <Alert
          message={projectError || dataError}
          type="error"
          style={{ marginBottom: "1em" }}
        />
      )}
      <FilterBar />
      <Divider orientation="left" />
      <ProjectsChart />
    </div>
  );
};

export default ProjectView;
