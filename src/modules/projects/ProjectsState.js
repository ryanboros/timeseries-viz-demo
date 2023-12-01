import axios from "axios";

/**
 * STORE MOUNT POINT
 **/
const STORE_MOUNT_POINT = "projects";

/**
 * ACTIONS
 **/
const FETCH_PROJECTS = "Projects/FETCH_PROJECTS";
const FETCH_PROJECTS_SUCCESS = "Projects/FETCH_PROJECTS_SUCCESS";
const FETCH_PROJECTS_ERROR = "Projects/FETCH_PROJECTS_ERROR";
const SELECT_PROJECT = "Projects/SELECT_PROJECT";

/**
 * ACTION CREATORS
 **/
function fetchProjects() {
  return async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS });
    try {
      const response = await axios.get("./src/projects.json");
      if (response != null) {
        dispatch({ type: FETCH_PROJECTS_SUCCESS, projects: response.data });
      }
    } catch (error) {
      dispatch({ type: FETCH_PROJECTS_ERROR, error: error });
    }
  };
}

function selectProject(id) {
  return (dispatch) => {
    dispatch({ type: SELECT_PROJECT, project_id: id });
  };
}

/**
 * INITIAL STATE
 **/
const initialState = {
  projects: [],
  selectedProject: "",
  loading: false,
  error: null,
};

/**
 * REDUCER
 **/
function ProjectsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        projects: action.projects,
      };
    case FETCH_PROJECTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SELECT_PROJECT:
      return {
        ...state,
        selectedProject: action.project_id,
      };
    default: {
      return state;
    }
  }
}

/**
 *  SELECTORS
 **/
const getProjects = (state) => state[STORE_MOUNT_POINT].projects;
const getSelectedProject = (state) => state[STORE_MOUNT_POINT].selectedProject;
const isProjectsLoading = (state) => state[STORE_MOUNT_POINT].loading;
const getError = (state) => state[STORE_MOUNT_POINT].error;

/**
 * REDUX OBJECT
 **/
const ProjectsState = {
  mountPoint: STORE_MOUNT_POINT,
  actions: {
    FETCH_PROJECTS,
  },
  actionCreators: {
    fetchProjects,
    selectProject,
  },
  selectors: {
    getProjects,
    isProjectsLoading,
    getError,
    getSelectedProject,
  },
  reducer: ProjectsReducer,
};

export default ProjectsState;
