<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app flat class="px-6 layout-navbar">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>MysticalDream</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon class="mr-2">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            bordered
            bottom
            color="deep-purple accent-4"
            dot
            offset-x="10"
            offset-y="10"
          >
            <v-avatar
              class="hidden-sm-and-down"
              color="grey darken-1 shrink"
              size="32"
              v-bind="attrs"
              v-on="on"
            ></v-avatar>
          </v-badge>
        </template>

        <v-list>
          <v-list-item v-for="n in items" :key="n.text" @click="n.callback">
            <v-list-item-title>{{ n.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container :class="{ s_div: showClass }" fluid>
        <router-view @callCustomStyle="addClass"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AwesomeView from "@/views/AwesomeView";
import { MessageBox } from "element-ui";

export default {
  data() {
    return {
      showDrawer: false,
      showClass: false,
      items: [
        {
          text: "个人中心",
          callback() {},
        },
        {
          text: "退出登录",
          callback: this.logout,
        },
      ],
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$vuetify.breakpoint.lgAndUp ? this.showDrawer : false;
      },
      set(v) {
        this.showDrawer = v;
      },
    },
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { AwesomeView },
  methods: {
    addClass() {
      this.showClass = !this.showClass;
    },
    logout() {
      MessageBox.confirm("此操作会退出登录，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.href = "/index";
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.s_div {
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>