import Vuetify from '../plugins/vuetify';
import * as constants from './constants';

export default {
  [constants.ADD_ASSIGNMENT](state, value) {
    state.assignments.push(value);
  },
  [constants.REMOVE_ASSIGNMENT](state, value) {
    state.assignments = state.assignments.filter((el) => el !== value);
  },
  [constants.MERGE_ASSIGNMENTS](state, assignments) {
    state.assignments = state.assignments.concat(assignments);
  },
  [constants.OVERWRITE_ASSIGNMENTS](state, assignments) {
    state.assignments = assignments;
  },
  [constants.REMOVE_TIMETABLE](state, value) {
    state.savedCourses = state.savedCourses.filter(
      (el) => el.id !== value._id && el.id !== value.id
    );
  },
  [constants.SAVE_TIMETABLE](state, timetable) {
    state.savedCourses.push({
      title: timetable.title,
      code: timetable.courseCode,
      sem: timetable.semester,
      collegeIndex: 0,
      college: timetable.college,
      id: timetable._id,
      savedAt: Date.now(),
    });
  },
  [constants.SET_ACCENT_COLOR](state, value) {
    Vuetify.framework.theme.themes.dark.primary = value;
    Vuetify.framework.theme.themes.light.primary = value;
    state.accentColor = value;
  },
  [constants.SET_CHAT_USERNAME](state, username) {
    state.username = username;
  },
  [constants.SET_CURRENT_CLASS](state, period) {
    state.currentClass = period;
  },
  [constants.SET_CURRENT_TIMETABLE](state, timetable) {
    state.currentTimetable = timetable;
  },
  [constants.SET_FETCHING](state, isFetching) {
    state.fetching = isFetching;
  },
  [constants.SET_RECENT_QUERY](state, recentQuery) {
    state.recentQuery = recentQuery;
  },
  [constants.TOGGLE_BOTTOM_SHEET](state, value) {
    state.showBottomSheet = value;
  },
  [constants.TOGGLE_DARK_MODE](state, value) {
    state.darkMode = value;
    Vuetify.framework.theme.dark = value;
  },
  [constants.TOGGLE_SHOW_WEEKENDS](state, value) {
    state.showWeekends = value;
  },
};
