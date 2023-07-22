<template>
  <div>
    <v-btn
      v-for="link in authProviders"
      :key="link.icon"
      variant="text"
      icon
      :color="link.color"
    >
      <v-icon>{{ link.icon }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authProviders: [
        {
          icon: "mdi-qqchat",
          color: "#5eabdf",
          colorInDark: "#4267b2",
        },
        {
          icon: "mdi-wechat",
          color: "#00af06",
          colorInDark: "#1da1f2",
        },
        {
          icon: "mdi-github",
          color: "#272727",
          colorInDark: "#fff",
        },
      ],
    };
  },
};
</script>

<style>
</style>