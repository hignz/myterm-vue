<template>
  <v-container>
    <AppBar title="Settings" />
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-card :class="accentedBorder" flat>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="12" class="pt-0">
                <p>Theme</p>
                <v-switch v-model="isDark" color="primary" label="Dark mode" />
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
                <p>Borders</p>
                <v-switch
                  v-model="showAccentedBorders"
                  color="primary"
                  label="Coloured borders"
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
import { mapActions } from 'vuex';

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
  watch: {
    isDark(newValue) {
      this.toggleDarkMode(newValue);
    },
    showAccentedBorders(newValue) {
      this.toggleAccentedBorders(newValue);
    }
  },
  mounted() {
    this.isDark = this.darkMode;
    this.showAccentedBorders = this.accentedBorders;
  },
  methods: {
    ...mapActions(['toggleDarkMode', 'toggleAccentedBorders']),
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
