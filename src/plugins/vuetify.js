import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    dark: true,
    options: {
      customProperties: true,
      variations: true,
    },
    themes: {
      light: {
        primary: JSON.parse(localStorage.getItem('vuex'))
          ? JSON.parse(localStorage.getItem('vuex')).accentColor
          : '#72DDF7',
        error: '#FF5252',
        success: '#41D1AB',
        background: '#f6f9fc',
      },
      dark: {
        primary: JSON.parse(localStorage.getItem('vuex'))
          ? JSON.parse(localStorage.getItem('vuex')).accentColor
          : '#72DDF7',
        error: '#FF5252',
        success: '#41D1AB',
        background: '#0d1117',
      },
    },
  },
});
