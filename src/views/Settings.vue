<template>
  <v-container fluid>
    <AppBar title="Settings">
      <template v-slot:icon>
        <v-btn icon :to="{ path: '/about' }">
          <v-icon class="grey--text">
            mdi-help-circle
          </v-icon>
        </v-btn>
      </template>
    </AppBar>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-card
          v-bind:class="{
            'accented-border': accentedBorders,
            'light-border': !accentedBorders && darkMode,
            'lighter-border': !accentedBorders && !darkMode
          }"
          flat
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-card-subtitle class="pl-0">Theme</v-card-subtitle>
                <v-switch
                  v-model="isDark"
                  color="primary"
                  label="Dark mode"
                ></v-switch>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-card-subtitle class="pl-0">Accent colour</v-card-subtitle>
                <v-chip-group v-model="colorSelection" class="my-2" mandatory>
                  <v-chip
                    v-for="color in colors"
                    :key="color.value"
                    pill
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
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-card-subtitle class="pl-0">Borders</v-card-subtitle>
                <v-switch
                  v-model="showAccentedBorders"
                  color="primary"
                  label="Coloured borders"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-none d-md-flex">
            <v-spacer />
            <v-btn color="primary" text :to="{ path: '/about' }">
              About
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from '../components/AppBar';
import AccentColorPicker from '../components/AccentColorPicker';
import vuetify from '../plugins/vuetify';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
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
    };
  },
  components: {
    AppBar,
    AccentColorPicker
  },
  mounted() {
    this.isDark = this.darkMode;
    this.showAccentedBorders = this.accentedBorders;
  },
  computed: {
    ...mapState(['darkMode', 'accentedBorders'])
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
  },
  watch: {
    isDark: function(newValue) {
      this.$store.dispatch('toggleDarkMode', newValue);
    },
    showAccentedBorders: function(newValue) {
      this.$store.dispatch('toggleAccentedBorders', newValue);
    }
  }
};
</script>

<style>
.accented-border {
  border: 0.5px solid var(--v-primary-base);
}
</style>
