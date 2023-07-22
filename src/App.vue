<template>
  <div id="app">
    <router-view></router-view>
    <Dialog></Dialog>
    <audio
      src="./assets/audio/a.mp3"
      ref="audio"
      @canplay="canPlay"
      preload
      loop
    ></audio>
  </div>
</template>

<script>
import Dialog from "./components/Dialog.vue";
export default {
  name: "App",
  components: { Dialog },
  data: () => ({
    can: false,
    playing: false,
  }),
  methods: {
    canPlay() {
      this.can = true;
    },
  },
  mounted() {
    this.$bus.$on("playMusic", () => {
      if (this.canPlay && !this.playing) {
        this.$refs.audio.play();
        this.playing = true;
      } else if (!this.canPlay) {
        this.$refs.audio.load();
        this.$refs.audio.play();
        this.playing = true;
      }
    });
    this.$bus.$on("pauseMusic", () => {
      if (this.playing) {
        this.$refs.audio.pause();
        this.playing = false;
      }
    });
  },
};
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>