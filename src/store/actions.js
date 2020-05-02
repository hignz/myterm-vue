/* eslint-disable no-unused-vars */
import http from '../utils/http';
import * as constants from './constants';

export default {
  fetchCourses(_, index) {
    return http.get(`/courses?college=${index}`).then(res => {
      return res.data;
    });
  },
  fetchTimetable({ commit }, options) {
    commit(constants.SET_LOADING, true);

    const { code, collegeIndex, semester } = options;

    return http
      .get(`/timetable/?code=${code}&college=${collegeIndex}&sem=${semester}`)
      .then(res => {
        return res.data;
      })
      .catch()
      .finally(() => {
        commit(constants.SET_LOADING, false);
      });
  },
  setLastTimetableVisited({ commit }, value) {
    commit(constants.SET_LAST_VISITED_TIMETABLE, value);
  },
  setLoading({ commit }, isLoading) {
    commit(constants.SET_LOADING, isLoading);
  },
  toggleAccentedBorders({ commit }, value) {
    commit(constants.TOGGLE_ACCENTED_BORDERS, value);
  },
  toggleDarkMode({ commit }, value) {
    commit(constants.TOGGLE_DARK_THEME, value);
  }
};
