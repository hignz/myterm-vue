import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

if (!localStorage.getItem('accentColor')) {
  localStorage.setItem('accentColor', '#41D1AB');
}
if (!localStorage.getItem('darkMode')) {
  localStorage.setItem('darkMode', true);
}
if (!localStorage.getItem('accentedBorders')) {
  localStorage.setItem('accentedBorders', false);
}

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: localStorage.getItem('accentColor'),
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#41D1AB',
        warning: '#FFC107'
      },
      dark: {
        primary: localStorage.getItem('accentColor'),
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#41D1AB',
        warning: '#FFC107'
      }
    }
  }
});
