/* eslint-disable no-unused-vars */
import http from '../utils/http';
// import router from '../router/index.js';
import * as constants from './constants';

export default {
  fetchCourses(_, index) {
    return http.get(`/courses?college=${index}`).then(res => {
      return res.data;
    });
  },
  fetchTimetable(_, options) {
    const { code, collegeIndex, semester } = options;

    return http
      .get(`/timetable/?code=${code}&college=${collegeIndex}&sem=${semester}`)
      .then(res => {
        return res.data;
      });
  },
  setLastTimetableVisited({ commit }, value) {
    commit(constants.SET_LAST_VISITED_TIMETABLE, value);
  },
  toggleDarkMode({ commit }, value) {
    commit(constants.TOGGLE_DARK_THEME, value);
  },
  toggleAccentedBorders({ commit }, value) {
    commit(constants.TOGGLE_ACCENTED_BORDERS, value);
  }
};
