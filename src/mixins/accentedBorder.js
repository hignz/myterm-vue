import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['accentedBorders', 'darkMode']),
    accentedBorder() {
      return this.accentedBorders
        ? 'accented-border'
        : !this.accentedBorders && this.darkMode
        ? 'dark-border'
        : !this.accentedBorders && !this.darkMode
        ? 'light-border'
        : '';
    }
  }
};
