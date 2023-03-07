import axios from "axios";

export const POST_DOGS = "POST_DOGS";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_WEIGHT = "SORT_BY_WEIGHT";
export const GET_DETAIL = "GET_DETAIL";
export const SEARCH_FAIL = "SEARCH_FAIL";
export const DELETE_DOG = "DELETE_DOG";
export const ORDER_YEARS = "ORDER_YEARS";

export function getDogs(name) {
  return async function (dispatch) {
    try {
      if (name) {
        return axios
          .get("http://localhost:3001/dogs?name=" + name)
          .then((res) => dispatch({ type: GET_DOGS, payload: res.data }))
          .catch((err) => dispatch({ type: GET_DOGS, payload: err.data }));
      };
      
      let json = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: GET_DOGS,
        payload: json.data,
      });
    } catch (err) {
      var fail = axios
        .get("http://localhost:3001/dogs?name=" + name)
        .then((res) => res.data);
      return dispatch({
        type: SEARCH_FAIL,
        payload: fail,
      });
    };
  };
};

export function getTemperaments() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/temperaments", {});
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: json.data,
    });
  };
};

export function filterDogsByTemperament(payload) {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
};

export function filterDogsByOrigin(payload) {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};

export function sortByName(payload) {
  return {
    type: SORT_BY_NAME,
    payload,
  };
};

export function sortByWeight(payload) {
  return {
    type: SORT_BY_WEIGHT,
    payload,
  };
};

export function postDog(payload) {
  return async function (dispatch) {
    let data = await axios.post(`http://localhost:3001/dogs`, payload);
    return dispatch({
      type: POST_DOGS,
      payload: data.data,
    });
  };
};

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let data = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: data.data,
      });
    } catch (err) {}
  };
};

export function orden_year(payload) {
  return {
    type: ORDER_YEARS,
    payload,
  };
};

export function delete_dog(id) {
  return async function (dispatch) {
    try {
      let data = await axios.delete(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: DELETE_DOG,
        payload: data.data,
      });
    } catch (err) {
      return dispatch({
        type: DELETE_DOG,
        payload: err,
      });
    };
  };
};