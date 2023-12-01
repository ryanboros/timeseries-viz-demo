import { configureStore } from "@reduxjs/toolkit";

import ProjectsState from "../modules/projects/ProjectsState";
import DataState from "../modules/data/DataState";

const reducers = {
  [ProjectsState.mountPoint]: ProjectsState.reducer,
  [DataState.mountPoint]: DataState.reducer,
};

export default configureStore({
  reducer: reducers,
});
