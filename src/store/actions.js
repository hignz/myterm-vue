/* eslint-disable no-unused-vars */
import http from '../utils/http';
import * as constants from './constants';

export default {
  addAssignment({ commit }, assignment) {
    commit(constants.ADD_ASSIGNMENT, assignment);
  },
  removeAssignment({ commit }, assignment) {
    commit(constants.REMOVE_ASSIGNMENT, assignment);
  },
  mergeAssignments({ commit }, assignments) {
    commit(constants.MERGE_ASSIGNMENTS, assignments);
  },
  overwriteAssignments({ commit }, assignments) {
    commit(constants.OVERWRITE_ASSIGNMENTS, assignments);
  },
  async fetchCourses(_, index) {
    return (await http.get(`/courses?college=${index}`)).data;
  },
  async fetchAssignmentList(_, assignmentListId) {
    return (
      await http.get(
        `https://myterm-assignment-tracker.herokuapp.com/v1/assignment/${assignmentListId}`
      )
    ).data;
  },
  async postAssignmentList(_, body) {
    return (
      await http.post(
        'https://myterm-assignment-tracker.herokuapp.com/v1/assignment',
        body
      )
    ).data;
  },
  async fetchTimetable({ commit }, query) {
    commit(constants.SET_FETCHING, true);
    commit(constants.SET_CURRENT_CLASS, null);

    try {
      const { code, college, sem } = query;
      const { data } = await http.get(
        `/timetables/?code=${code}&college=${college}${`&sem=${sem}`}`
      );
      commit(constants.SET_CURRENT_TIMETABLE, data);
      commit(constants.SET_RECENT_QUERY, query);
      return data;
    } finally {
      commit(constants.SET_FETCHING, false);
    }
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
