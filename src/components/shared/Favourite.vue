<template>
  <v-btn icon @click="saveTimetable()">
    <v-icon :color="heartIconColor">{{
      isSaved ? 'mdi-heart' : 'mdi-heart-outline'
    }}</v-icon>
  </v-btn>
</template>
