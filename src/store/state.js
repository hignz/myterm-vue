export default {
  lastTimetableVisited: localStorage.getItem('courseQuery') || null,
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || null,
  loading: true,
  accentedBorders: JSON.parse(localStorage.getItem('accentedBorders')) || true
};
