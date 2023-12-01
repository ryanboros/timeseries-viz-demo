import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Row, Select } from "antd";
import moment from "moment";

import ProjectsState from "../projects/ProjectsState";
import DataState from "../data/DataState";

const FilterBar = () => {
  /**
   * REDUX DATA
   **/
  const dispatch = useDispatch();
  const projects = useSelector(ProjectsState.selectors.getProjects);
  const { selectProject } = ProjectsState.actionCreators;
  const { setRange } = DataState.actionCreators;

  /**
   * INTERNAL METHODS
   **/
  const _onSelectProject = (value) => {
    dispatch(selectProject(value));
  };

  const _onClearProject = () => {
    dispatch(selectProject(null));
  };

  const _onPickRange = (value) => {
    const range = value.map((v) => v.unix());
    dispatch(setRange(range));
  };

  /**
   * RENDER
   **/
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  return (
    <Row justify="end" align="middle">
      <span>Project:</span>
      <Select
        onChange={_onSelectProject}
        onClear={_onClearProject}
        style={{ width: 150, marginLeft: "1em", marginRight: "1em" }}
        allowClear
      >
        {projects.map((s, i) => (
          <Option key={i} value={s.id}>
            {s.name}
          </Option>
        ))}
      </Select>

      <span>Range:</span>
      <RangePicker
        showTime={{ format: "hh:mm:a" }}
        format="MM/DD hh:mm:a"
        onChange={_onPickRange}
        style={{ marginLeft: "1em" }}
        defaultValue={[
          moment("2020-10-15 00:00:00", "YYYY-MM-DD HH:mm:ss"),
          moment("2020-10-21 23:45:00", "YYYY-MM-DD HH:mm:ss"),
        ]}
      />
    </Row>
  );
};

export default FilterBar;
