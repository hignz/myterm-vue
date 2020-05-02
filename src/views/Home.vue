<template>
  <v-container>
    <v-row justify="center" class="mt-24">
      <v-col sm="8" md="6" lg="4">
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
  name: 'Home',
  components: { SelectionForm }
};
</script>

<style scoped>
.mt-24 {
  margin-top: 5rem;
}
</style>
