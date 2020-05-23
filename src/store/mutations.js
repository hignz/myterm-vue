import vuetify from '../plugins/vuetify';
import * as constants from './constants';

export default {
  [constants.REMOVE_TIMETABLE](state, value) {
    state.savedCourses = state.savedCourses.filter(
      el => el.id !== value._id && el.id !== value.id
    );

    localStorage.setItem('savedCourses', JSON.stringify(state.savedCourses));
  },
  [constants.SAVE_TIMETABLE](state, value) {
    state.savedCourses.push({
      title: value.title,
      code: value.courseCode,
      sem: value.semester,
      collegeIndex: 0,
      college: value.college,
      id: value._id
    });
    localStorage.setItem('savedCourses', JSON.stringify(state.savedCourses));
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
    localStorage.setItem('courseQuery', JSON.stringify(recentQuery));
  },
  [constants.TOGGLE_ACCENTED_BORDERS](state, value) {
    state.accentedBorders = value;
    localStorage.setItem('accentedBorders', value);
  },
  [constants.TOGGLE_DARK_MODE](state, value) {
    state.darkMode = value;
    vuetify.framework.theme.dark = value;
    localStorage.setItem('darkMode', value);
  },
  [constants.TOGGLE_SHOW_WEEKENDS](state, value) {
    state.showWeekends = value;
    localStorage.setItem('showWeekends', value);
  }
};
