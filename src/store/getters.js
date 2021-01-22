export default {
  getTimetableByWeekdays: (state) => {
    return state.showWeekends
      ? state.currentTimetable.data
      : state.currentTimetable.data.slice(0, 5);
  },
};
