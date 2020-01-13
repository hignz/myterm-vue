<template>
  <v-container fill-height>
    <v-row justify="center" align="end" class="mb-24 ml-0">
      <v-col cols="12" sm="8" md="4">
        <p class="display-2 mb-12 text-center">
          My<span class="primary--text">Term</span>
        </p>
        <SelectionForm></SelectionForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SelectionForm from '../components/SelectionForm';

export default {
  name: 'home',
  components: { SelectionForm },
  data: () => ({}),
  created() {},
  methods: {}
};
</script>

<style scoped>
.mb-24 {
  margin-bottom: 250px;
}
</style>
