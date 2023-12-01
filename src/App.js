import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout, Typography } from "antd";
import "./App.css";

import ChartView from "./modules/chart/ChartView";
import ProjectsState from "./modules/projects/ProjectsState";
import DataState from "./modules/data/DataState";

let didInit = false;

function App() {
  /**
   * REDUX DATA
   **/
  const dispatch = useDispatch();
  const { fetchProjects } = ProjectsState.actionCreators;
  const { fetchData } = DataState.actionCreators;

  /**
   * EFFECTS
   **/
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      dispatch(fetchProjects());
      dispatch(fetchData());
    }
  }, [dispatch, fetchData, fetchProjects]);

  /**
   * RENDER
   **/
  const { Header, Content, Footer } = Layout;
  const { Title } = Typography;

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Title level={2} style={{ color: "white", marginBottom: 0 }}>
            UI Challenge
          </Title>
        </Header>
        <Content>
          <ChartView />
        </Content>
        <Footer>by Ryan Boros</Footer>
      </Layout>
    </div>
  );
}

export default App;
