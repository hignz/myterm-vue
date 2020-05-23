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

    const { code, college, sem } = options;

    return http
      .get(`/timetable/?code=${code}&college=${college}${`&sem=${sem}`}`)
      .then(res => {
        commit(constants.SET_CURRENT_TIMETABLE, res.data);
        commit(constants.SET_RECENT_QUERY, options);
        return res.data;
      })
      .catch()
      .finally(() => {
        commit(constants.SET_FETCHING, false);
      });
  },
  removeTimetable({ commit }, item) {
    commit(constants.REMOVE_TIMETABLE, item);
  },
  saveTimetable({ commit }, item) {
    commit(constants.SAVE_TIMETABLE, item);
  },
  setFetching({ commit }, isFetching) {
    commit(constants.SET_FETCHING, isFetching);
  },
  setOnCurrentClass({ commit }, item) {
    commit(constants.SET_ONGOING_PERIOD, item);
  },
  toggleAccentedBorders({ commit }, value) {
    commit(constants.TOGGLE_ACCENTED_BORDERS, value);
  },
  toggleDarkMode({ commit }, value) {
    commit(constants.TOGGLE_DARK_MODE, value);
  },
  toggleShowWeekends({ commit }, value) {
    commit(constants.TOGGLE_SHOW_WEEKENDS, value);
  }
};
