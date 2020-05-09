export default {
  data() {
    return {
      items: [
        {
          text: 'Search',
          icon: 'mdi-magnify',
          route: '/',
          showOnFirstLoad: true
        },
        {
          text: 'Timetable',
          icon: 'mdi-timetable',
          route: '/timetable',
          showOnFirstLoad: false
        },
        {
          text: 'Saved',
          icon: 'mdi-heart',
          route: '/saved',
          showOnFirstLoad: true
        },
        {
          text: 'Settings',
          icon: 'mdi-cog',
          route: '/settings',
          showOnFirstLoad: true
        }
      ]
    };
  }
};
