<template>
  <v-main>
    <v-container fill-height class="custom_container">
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn rounded @click="play" large color="error">Play</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  methods: {
    play() {
      this.$router.push({ path: "/index/awesome" });
    },
  },
};
</script>

<style scoped>
.custom_container {
  max-width: 600px;
  margin: 0 auto;
}
</style>