export default {
  getTimetableByWeekdays: (state) => {
    if (state.currentTimetable.data) {
      return state.showWeekends
        ? state.currentTimetable.data
        : state.currentTimetable.data.slice(0, 5);
    }
  },
};
