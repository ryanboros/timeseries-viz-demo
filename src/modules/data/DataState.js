import axios from "axios";
import { parse, getUnixTime } from "date-fns";
import { red, orange, yellow, green, blue } from "@ant-design/colors";

/**
 * STORE MOUNT POINT
 **/
const STORE_MOUNT_POINT = "data";

/**
 * CONSTANTS
 **/

export const CHART_COLORS = [
  blue.primary,
  orange.primary,
  green.primary,
  yellow.primary,
  red.primary,
];

/**
 * METHODS
 **/

const translateChartData = (data) =>
  data.map((d) => ({
    project_id: d.project_id,
    series: d.data.map(([timestamp, value]) => {
      const ts = parse(timestamp, "yyyy-MM-dd HH:mm:ssXXX", new Date());
      return { timestamp: getUnixTime(ts), value };
    }),
  }));

/**
 * ACTIONS
 **/
const FETCH_DATA = "Data/FETCH_PROJECT_DATA";
const FETCH_DATA_SUCCESS = "Data/FETCH_PROJECT_DATA_SUCCESS";
const FETCH_DATA_ERROR = "Data/FETCH_PROJECTS_ERROR";
const SET_RANGE = "Data/SET_RANGE";

/**
 * ACTION CREATORS
 **/

function fetchData() {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA });
    try {
      const response = await axios.get("./src/data.json");
      if (response != null) {
        dispatch({ type: FETCH_DATA_SUCCESS, data: response.data });
      }
    } catch (error) {
      dispatch({ type: FETCH_DATA_ERROR, error: error });
    }
  };
}

function setRange(value) {
  return (dispatch) => {
    dispatch({
      type: SET_RANGE,
      startTime: value[0],
      endTime: value[1],
    });
  };
}

/**
 * INITIAL STATE
 **/
const initialState = {
  data: [],
  startTime: null,
  endTime: null,
  loading: false,
  error: null,
};

/**
 * REDUCER
 **/
function DataReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        data: translateChartData(action.data),
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case SET_RANGE: {
      console.log(action);
      return {
        ...state,
        startTime: action.startTime,
        endTime: action.endTime,
      };
    }
    default: {
      return state;
    }
  }
}

/**
 *  SELECTORS
 **/
const getData = (state) => state[STORE_MOUNT_POINT].data;
const isDataLoading = (state) => state[STORE_MOUNT_POINT].loading;
const getError = (state) => state[STORE_MOUNT_POINT].error;
const getRange = (state) => [
  state[STORE_MOUNT_POINT].startTime,
  state[STORE_MOUNT_POINT].endTime,
];

/**
 * REDUX OBJECT
 **/
const DataState = {
  mountPoint: STORE_MOUNT_POINT,
  actions: {
    FETCH_DATA,
  },
  actionCreators: {
    fetchData,
    setRange,
  },
  selectors: {
    getData,
    isDataLoading,
    getError,
    getRange,
  },
  reducer: DataReducer,
};

export default DataState;
