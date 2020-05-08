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
    commit(constants.SET_FETCHING, true);

    const { code, collegeIndex, semester } = options;

    return http
      .get(
        `/timetable/?code=${code}&college=${collegeIndex}${
          semester ? `&sem=${semester}` : ''
        }`
      )
      .then(res => {
        return res.data;
      })
      .catch()
      .finally(() => {
        commit(constants.SET_FETCHING, false);
      });
  },
  setLastTimetableVisited({ commit }, value) {
    commit(constants.SET_LAST_VISITED_TIMETABLE, value);
  },
  setLoading({ commit }, isLoading) {
    commit(constants.SET_FETCHING, isLoading);
  },
  toggleAccentedBorders({ commit }, value) {
    commit(constants.TOGGLE_ACCENTED_BORDERS, value);
  },
  toggleDarkMode({ commit }, value) {
    commit(constants.TOGGLE_DARK_THEME, value);
  }
};
