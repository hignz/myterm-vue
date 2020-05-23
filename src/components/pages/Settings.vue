<template>
  <v-container>
    <AppBar title="Settings" />
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-card :class="accentedBorder" flat>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="12" class="pt-0">
                <p class="caption">THEME</p>
                <v-switch v-model="isDark" color="primary" label="Dark mode" />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <p class="caption">ACCENT COLOR</p>
                <v-chip-group>
                  <v-chip
                    v-for="color in colors"
                    :key="color.value"
                    pill
                    outlined
                    @click="changeAccentColor(color)"
                  >
                    <v-avatar left :color="color.value" />
                    {{ color.name }}
                  </v-chip>
                  <v-chip
                    pill
                    outlined
                    @click="showColorPicker = !showColorPicker"
                  >
                    Custom
                  </v-chip>
                </v-chip-group>
                <AccentColorPicker
                  v-if="showColorPicker"
                  class="mt-4 animate__animated animate__fadeIn animate__faster"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <p class="caption">BORDERS</p>
                <v-switch
                  v-model="showAccentedBorders"
                  color="primary"
                  label="Coloured borders"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <p>Timetable</p>
                <v-switch
                  v-model="weekends"
                  color="primary"
                  label="Show weekends"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppBar from '@/components/shared/AppBar';
import AccentColorPicker from '@/components/shared/AccentColorPicker';
import vuetify from '@/plugins/vuetify';
import genericMetaInfo from '@/mixins/genericMetaInfo';
import accentedBorder from '@/mixins/accentedBorder';

export default {
  components: {
    AppBar,
    AccentColorPicker
  },
  mixins: [genericMetaInfo, accentedBorder],
  data: () => ({
    isDark: false,
    showColorPicker: false,
    colors: [
      { name: 'Cyan', value: '#41D1AB' },
      { name: 'Green', value: '#50fa7b' },
      { name: 'Blue', value: '#72DDF7' },
      { name: 'Coral', value: '#ef596f' },
      { name: 'Pink', value: '#ff79c6' },
      { name: 'Purple', value: '#bd93f9' },
      { name: 'Yellow', value: '#f1fa8c' }
    ],
    showAccentedBorders: true,
    weekends: true
  }),
  computed: {
    ...mapState(['showWeekends'])
  },
  watch: {
    isDark(newValue) {
      this.toggleDarkMode(newValue);
    },
    showAccentedBorders(newValue) {
      this.toggleAccentedBorders(newValue);
    },
    weekends(newValue) {
      this.toggleShowWeekends(newValue);
    }
  },
  created() {
    this.isDark = this.darkMode;
    this.showAccentedBorders = this.accentedBorders;
    this.weekends = this.showWeekends;
  },
  methods: {
    ...mapActions([
      'toggleDarkMode',
      'toggleAccentedBorders',
      'toggleShowWeekends'
    ]),
    changeAccentColor(color) {
      const { value } = color;
      vuetify.framework.theme.themes.dark.primary = value;
      vuetify.framework.theme.themes.light.primary = value;
      localStorage.setItem('accentColor', value);

      this.showColorPicker = false;
    }
  }
};
</script>
