<template>
  <v-select
    v-model="selectedCollege"
    :items="colleges"
    label="Colleges"
    prepend-inner-icon="mdi-school"
    dense
    @change="$emit('collegeChange', collegeIndex)"
  ></v-select>
</template>

<script>
export default {
  data: () => ({
    selectedCollege: '',
    colleges: ['IT Sligo', 'Athlone IT', 'Limerick IT']
  }),
  computed: {
    collegeIndex() {
      return this.colleges.indexOf(this.selectedCollege);
    }
  }
};
</script>
