export default {
  lastTimetableVisited: localStorage.getItem('courseQuery') || null,
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || true,
  loading: true,
  accentedBorders: JSON.parse(localStorage.getItem('accentedBorders')) || true
};
