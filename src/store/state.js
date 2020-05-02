export default {
  accentedBorders: JSON.parse(localStorage.getItem('accentedBorders')) || null,
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || null,
  lastTimetableVisited: localStorage.getItem('courseQuery') || null,
  loading: false
};
