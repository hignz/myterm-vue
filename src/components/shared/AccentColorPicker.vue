<template>
  <v-color-picker
    v-model="color"
    show-swatches
    mode="hexa"
    style="color: white"
    :hide-mode-switch="true"
    @input="updateAccent()"
  />
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      type: 'hex',
      hex: '#123456',
    };
  },
  computed: {
    ...mapState(['accentColor']),
    color: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      },
    },
  },
  created() {
    this.hex = this.$vuetify.theme.framework.theme.isDark
      ? this.$vuetify.theme.themes.dark.primary
      : this.$vuetify.theme.themes.light.primary;
  },
  methods: {
    ...mapActions(['setAccentColor']),
    updateAccent() {
      this.setAccentColor(this.color);
    },
  },
};
</script>
