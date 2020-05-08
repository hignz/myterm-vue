<template>
  <v-container>
    <AppBar title="Settings"> </AppBar>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-card
          :class="{
            'accented-border': accentedBorders,
            'dark-border': !accentedBorders && darkMode,
            'light-border': !accentedBorders && !darkMode
          }"
          flat
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <p>Theme</p>
                <v-switch
                  v-model="isDark"
                  color="primary"
                  label="Dark mode"
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <p>Accent colour</p>
                <v-chip-group v-model="colorSelection" mandatory>
                  <v-chip
                    v-for="color in colors"
                    :key="color.value"
                    pill
                    outlined
                    @click="changeAccentColor(color)"
                  >
                    <v-avatar left :color="color.value"></v-avatar>
                    {{ color.name }}
                  </v-chip>
                  <v-chip pill @click="showColorPicker = !showColorPicker">
                    Custom
                  </v-chip>
                </v-chip-group>
                <AccentColorPicker v-if="showColorPicker"></AccentColorPicker>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <p>Borders</p>
                <v-switch
                  v-model="showAccentedBorders"
                  color="primary"
                  label="Coloured borders"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import AppBar from '@/components/shared/AppBar';
import AccentColorPicker from '@/components/shared/AccentColorPicker';
import vuetify from '@/plugins/vuetify';
import genericMetaInfo from '@/mixins/genericMetaInfo';

export default {
  components: {
    AppBar,
    AccentColorPicker
  },
  mixins: [genericMetaInfo],
  data: () => ({
    isDark: false,
    showColorPicker: false,
    colorSelection: 0,
    colors: [
      { name: 'Cyan', value: '#41D1AB' },
      { name: 'Green', value: '#50fa7b' },
      { name: 'Blue', value: '#72DDF7' },
      { name: 'Coral', value: '#ef596f' },
      { name: 'Pink', value: '#ff79c6' },
      { name: 'Purple', value: '#bd93f9' },
      { name: 'Yellow', value: '#f1fa8c' }
    ],
    showAccentedBorders: true
  }),
  computed: {
    ...mapState(['darkMode', 'accentedBorders'])
  },
  watch: {
    isDark: function(newValue) {
      this.$store.dispatch('toggleDarkMode', newValue);
    },
    showAccentedBorders: function(newValue) {
      this.$store.dispatch('toggleAccentedBorders', newValue);
    }
  },
  mounted() {
    this.isDark = this.darkMode;
    this.showAccentedBorders = this.accentedBorders;
  },
  methods: {
    ...mapActions(['setDarkMode']),
    changeAccentColor(color) {
      const value = color.value;
      vuetify.framework.theme.themes.dark.primary = value;
      vuetify.framework.theme.themes.light.primary = value;
      localStorage.setItem('accentColor', value);

      this.showColorPicker = false;
    }
  }
};
</script>
