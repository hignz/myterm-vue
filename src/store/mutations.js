import vuetify from '../plugins/vuetify';
import * as constants from './constants';

export default {
  [constants.SET_LAST_VISITED_TIMETABLE](state, lastTimetableVisited) {
    state.lastTimetableVisited = lastTimetableVisited;
    localStorage.setItem('courseQuery', lastTimetableVisited);
  },
  [constants.SET_FETCHING](state, isFetching) {
    state.fetching = isFetching;
  },
  [constants.TOGGLE_ACCENTED_BORDERS](state, value) {
    state.accentedBorders = value;
    localStorage.setItem('accentedBorders', value);
  },
  [constants.TOGGLE_DARK_MODE](state, value) {
    state.darkMode = value;
    vuetify.framework.theme.dark = value;
    localStorage.setItem('darkMode', value);
  }
};
