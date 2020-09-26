/* eslint-disable no-unused-vars */
import http from '../utils/http';
import * as constants from './constants';

export default {
  fetchCourses(_, index) {
    return http.get(`/courses?college=${index}`).then((res) => {
      return res.data;
    });
  },
  fetchTimetable({ commit }, options) {
    commit(constants.SET_FETCHING, true);
    commit(constants.SET_CURRENT_CLASS, null);
    const { code, college, sem } = options;

    return http
      .get(`/timetables/?code=${code}&college=${college}${`&sem=${sem}`}`)
      .then((res) => {
        commit(constants.SET_CURRENT_TIMETABLE, res.data);
        commit(constants.SET_RECENT_QUERY, options);
        return res.data;
      })
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
  setFetching({ commit }, value) {
    commit(constants.SET_FETCHING, value);
  },
  setAccentColor({ commit }, value) {
    commit(constants.SET_ACCENT_COLOR, value);
  },
  setChatUsername({ commit }, value) {
    commit(constants.SET_CHAT_USERNAME, value);
  },
  setCurrentClass({ commit }, item) {
    commit(constants.SET_CURRENT_CLASS, item);
  },
  toggleBottomSheet({ commit }, value) {
    commit(constants.TOGGLE_BOTTOM_SHEET, value);
  },
  toggleDarkMode({ commit }, value) {
    commit(constants.TOGGLE_DARK_MODE, value);
  },
  toggleShowWeekends({ commit }, value) {
    commit(constants.TOGGLE_SHOW_WEEKENDS, value);
  },
};
