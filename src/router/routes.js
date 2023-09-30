export const routeOptions = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/saved',
    name: 'Saved',
  },
  {
    path: '/settings',
    name: 'Settings',
  },
  {
    path: '/timetable/stats',
    name: 'Stats',
    props: true,
  },
  // {
  //   path: '/chat/:id',
  //   name: 'Chat',
  // },
  {
    path: '/import-assignments/:id',
    name: 'ImportAssignments',
  },
  {
    path: '/timetable',
    name: 'Timetable',
    props: true,
  },
];
