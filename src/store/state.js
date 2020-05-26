export default {
  accentedBorders: JSON.parse(localStorage.getItem('accentedBorders')) || false,
  currentClass: null,
  currentTimetable: {},
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || null,
  fetching: false,
  savedCourses: JSON.parse(localStorage.getItem('savedCourses')) || [],
  showWeekends: JSON.parse(localStorage.getItem('showWeekends')) || null,
  recentQuery: JSON.parse(localStorage.getItem('courseQuery')) || null
};
