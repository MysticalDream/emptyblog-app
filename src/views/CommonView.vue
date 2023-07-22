<template>
  <v-app class="bg-img">
    <v-main>
      <v-container fill-height class="custom_container">
        <v-row>
          <v-col cols="12">
            <v-card class="pa-3" elevation="2">
              <v-card-title class="justify-center align-center">{{
                title
              }}</v-card-title>
              <v-card-text
                :class="{
                  'pl-16': !$vuetify.breakpoint.mobile,
                  'pr-16': !$vuetify.breakpoint.mobile,
                }"
              >
                <component :is="commonName"></component>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
export default {
  components: { LoginForm, RegisterForm },
  data() {
    return {};
  },
  computed: {
    commonName: function () {
      let cn = this.$route.params.component;
      let res = "";
      switch (cn) {
        case "login":
          res = "LoginForm";
          break;
        case "register":
          res = "RegisterForm";
          break;
        default:
          break;
      }
      return res;
    },
    title: function () {
      let cn = this.$route.params.component;
      let res = "";
      switch (cn) {
        case "login":
          res = "MysticalDream系统登录";
          break;
        case "register":
          res = "MysticalDream系统注册";
          break;
        default:
          break;
      }
      return res;
    },
  },
  methods: {},
};
</script>

<style scoped>
.bg-img {
  background-image: url("/src/assets/material.jpg");
  background-size: cover;
}
.custom_container {
  max-width: 600px;
  margin: 0 auto;
}
</style>