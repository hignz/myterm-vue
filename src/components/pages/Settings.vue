<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="Settings" />
    <v-row justify="center">
      <v-col cols="12" sm="12" md="5" lg="6" class="pt-0 pt-md-3">
        <v-card outlined>
          <v-tabs v-model="tab">
            <v-tab>Customization</v-tab>
            <v-tab>General</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-card-text class="mt-2">
                  <v-row>
                    <v-col cols="12" sm="12" md="7">
                      <p class="font-weight-bold caption">THEME</p>
                      <p>You can select a dark or light theme below!</p>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-card hover dark @click="setDarkTheme()">
                            <v-card-title>Dark theme</v-card-title>
                            <v-card-text>
                              <p>Click me</p>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn text>Example</v-btn>
                              <v-btn text color="primary">Example</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-card hover light @click="setLightTheme()">
                            <v-card-title>Light theme</v-card-title>
                            <v-card-text>
                              <p>Click me</p>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn text>Example</v-btn>
                              <v-btn text color="primary">Example</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="mt-4">
                      <p class="font-weight-bold caption">
                        {{ darkMode ? 'DARK' : 'LIGHT' }} ACCENT COLORS
                      </p>
                      <p>
                        Choose the accent color below. This color is used
                        throughout the app
                      </p>
                      <v-chip-group v-model="selectedColorIndex">
                        <v-chip
                          v-for="color in themeColors"
                          :key="color"
                          filter
                          :text-color="color"
                          @click="changeAccentColor(color)"
                        >
                          <v-avatar :color="color" />
                        </v-chip>
                        <v-chip
                          text-color="primary"
                          filter
                          :filter-icon="mdiPaletteOutline"
                          @click="showColorPicker = !showColorPicker"
                        >
                          Custom
                        </v-chip>
                      </v-chip-group>
                      <AccentColorPicker v-if="showColorPicker" class="mt-4" />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text class="mt-2">
                  <p class="font-weight-bold caption">TIMETABLE</p>
                  <v-switch
                    v-model="isShowWeekends"
                    color="primary"
                    label="Show weekends"
                    hint="Some courses have classes on the weekend. Enable this if your course is one of these"
                    persistent-hint
                  >
                  </v-switch>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
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
import { mdiPaletteOutline, mdiHelpCircle, mdiCalendarWeekend } from '@mdi/js';

export default {
  components: {
    AppBar,
    AccentColorPicker,
  },
  mixins: [genericMetaInfo],
  data: () => ({
    showColorPicker: false,
    darkColors: ['#41D1AB', '#72DDF7', '#EF596F', '#009DF8', '#F9F871'],
    lightColors: ['#009DF8', '#EF596F', '#FF79C6', '#87A890'],
    selectedColorIndex: 0,
    mdiPaletteOutline,
    tab: null,
    mdiHelpCircle,
    mdiCalendarWeekend,
  }),
  computed: {
    ...mapState(['showWeekends', 'darkMode', 'accentColor']),
    isShowWeekends: {
      get() {
        return this.showWeekends;
      },
      set(value) {
        this.toggleShowWeekends(value);
      },
    },
    themeColors() {
      return this.darkMode ? this.darkColors : this.lightColors;
    },
  },
  mounted() {
    this.selectColorChip();
  },
  methods: {
    ...mapActions(['toggleDarkMode', 'toggleShowWeekends', 'setAccentColor']),
    setDarkTheme() {
      this.toggleDarkMode(true);
    },
    setLightTheme() {
      this.toggleDarkMode(false);
    },
    selectColorChip() {
      this.selectedColorIndex = this.themeColors.findIndex(
        (el) => el.toUpperCase() === this.accentColor.toUpperCase()
      );
    },
    changeAccentColor(color) {
      this.setAccentColor(color);
      this.showColorPicker = false;
    },
  },
};
</script>
