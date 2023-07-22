<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-dialog v-model="isShowFormDig" persistent max-width="680px">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Privacy Policy
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="isDialogClose"> 取消 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dialog",
  data() {
    return {
      isShowFormDig: false,
    };
  },
  computed: {
    ...mapGetters("dialog", ["isDialogShowOn"]),
  },
  watch: {
    isDialogShowOn: function (n, o) {
      this.isShowFormDig = n;
      console.log(o);
    },
  },
  methods: {
    isDialogClose() {
      this.$store.commit("dialog/dialogClick", false);
    },
  },
};
</script>

<style>
</style>