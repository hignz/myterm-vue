<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="Settings" />
    <v-row justify="center">
      <v-col cols="12" sm="12" md="5" lg="6" class="pt-0 pt-md-3">
        <v-card outlined flat>
          <v-card-text class="pt-2">
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <p class="font-weight-bold caption">THEME</p>
                <v-switch v-model="isDark" color="primary" label="Dark mode" />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <p class="font-weight-bold caption">
                  {{ darkMode ? 'DARK' : 'LIGHT' }} ACCENT COLOURS
                </p>
                <v-chip-group v-model="selectedColorIndex">
                  <v-chip
                    v-for="color in themeColors"
                    :key="color.value"
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
              <v-col cols="12" sm="12" md="4">
                <p class="font-weight-bold caption">TIMETABLE</p>
                <v-switch
                  v-model="isShowWeekends"
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
import genericMetaInfo from '@/mixins/genericMetaInfo';

export default {
  components: {
    AppBar,
    AccentColorPicker,
  },
  mixins: [genericMetaInfo],
  data: () => ({
    showColorPicker: false,
    darkColors: [
      { name: 'Cyan', value: '#41D1AB' },
      { name: 'Blue', value: '#72DDF7' },
      { name: 'Coral', value: '#ef596f' },
      { name: 'Dark Blue', value: '#009DF8' },
      { name: 'Yellow', value: '#F9F871' },
    ],
    lightColors: [
      { name: 'Dark Blue', value: '#009DF8' },
      { name: 'Coral', value: '#ef596f' },
      { name: 'Pink', value: '#ff79c6' },
      { name: 'Dark Blue', value: '#87A890' },
    ],
    selectedColorIndex: 0,
  }),
  computed: {
    ...mapState(['showWeekends', 'darkMode', 'accentColor']),
    isDark: {
      get() {
        return this.darkMode;
      },
      set(value) {
        this.toggleDarkMode(value);
        this.selectColorChip();
      },
    },
    isShowWeekends: {
      get() {
        return this.showWeekends;
      },
      set(value) {
        this.toggleShowWeekends(value);
      },
    },
    themeColors() {
      return this.isDark ? this.darkColors : this.lightColors;
    },
  },
  created() {
    this.selectColorChip();
  },
  methods: {
    ...mapActions(['toggleDarkMode', 'toggleShowWeekends', 'setAccentColor']),
    selectColorChip() {
      this.selectedColorIndex = this.themeColors.findIndex(
        (el) => el.value === this.accentColor
      );
    },
    changeAccentColor(color) {
      const { value } = color;
      this.setAccentColor(value);
      this.showColorPicker = false;
    },
  },
};
</script>
