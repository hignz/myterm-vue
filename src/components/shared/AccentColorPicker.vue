<template>
  <v-color-picker
    v-model="color"
    show-swatches
    mode="hexa"
    :hide-mode-switch="true"
  />
</template>

<script>
import vuetify from '@/plugins/vuetify';

export default {
  data: () => ({
    type: 'hex',
    hex: '#696969'
  }),
  computed: {
    color: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      }
    }
  },
  watch: {
    hex: val => {
      vuetify.framework.theme.themes.dark.primary = val;
      vuetify.framework.theme.themes.light.primary = val;
      localStorage.setItem('accentColor', val);
    }
  },
  created() {
    this.hex = vuetify.framework.theme.isDark
      ? vuetify.framework.theme.themes.dark.primary
      : vuetify.framework.theme.themes.light.primary;
  }
};
</script>
