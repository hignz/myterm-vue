import { mdiMagnify, mdiTimetable, mdiHeart, mdiCog } from '@mdi/js';

export default {
  data() {
    return {
      items: [
        {
          text: 'Search',
          icon: mdiMagnify,
          route: '/',
          showOnFirstVisit: true
        },
        {
          text: 'Timetable',
          icon: mdiTimetable,
          route: '/timetable',
          showOnFirstVisit: false
        },
        {
          text: 'Saved',
          icon: mdiHeart,
          route: '/saved',
          showOnFirstVisit: true
        },
        {
          text: 'Settings',
          icon: mdiCog,
          route: '/settings',
          showOnFirstVisit: true
        }
      ]
    };
  }
};
