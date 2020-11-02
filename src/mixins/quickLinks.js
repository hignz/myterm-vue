import {
  mdiSchool,
  mdiMail,
  mdiGoogleClassroom,
  mdiDesktopClassic,
  mdiLibraryShelves,
  mdiViewDashboard,
  mdiCounter,
} from '@mdi/js';

export default {
  data() {
    return {
      links: [
        [
          {
            title: 'Email',
            url: 'http://outlook.com/mail.itsligo.ie',
            icon: mdiMail,
          },
          {
            title: 'Moodle',
            url: 'https://vle.itsligo.ie/my/index.php',
            icon: mdiSchool,
          },
          {
            title: 'Room Booking',
            url: 'https://libreserve.itsligo.ie/',
            icon: mdiGoogleClassroom,
          },
          {
            title: 'Virtual Desktop',
            url: 'https://vdesktop.itsligo.ie/Citrix/SligoWeb/',
            icon: mdiDesktopClassic,
          },
          {
            title: 'Library',
            url: 'https://library.itsligo.ie/',
            icon: mdiLibraryShelves,
          },
          {
            title: 'Online Grades',
            url:
              'https://ssb.ancheim.ie/its/app/twbkwbis.P_GenMenu?name=homepage',
            icon: mdiCounter,
          },
          {
            title: 'Student Hub',
            url: 'https://www.itsligo.ie/student-hub/',
            icon: mdiViewDashboard,
          },
        ],
        [],
        [
          {
            title: 'Moodle',
            url: 'https://moodle.lit.ie/',
          },
        ],
      ],
    };
  },
};
