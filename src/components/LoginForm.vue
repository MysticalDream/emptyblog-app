<template>
  <v-form ref="form" @submit.prevent="submitForm">
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          v-model="form.username"
          label="用户名/邮箱"
          :rules="usernameRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="form.password"
          label="密码"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          :autocomplete="'off'"
        ></v-text-field>

        <v-sheet
          class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
        >
          <v-checkbox v-model="checkbox" :label="'记住我'"></v-checkbox>
          <a class="ms-2 mb-1 text-decoration-none" href="javascript:void(0)"
            >忘记密码</a
          >
        </v-sheet>

        <v-btn color="primary" type="submit" block>登录</v-btn>
      </v-col>

      <v-col cols="12 text-center text-base">
        <span>新用户？</span>
        <router-link
          to="/user/register"
          v-text="'创建账号'"
          class="text-decoration-none text-primary ms-2"
        ></router-link>
      </v-col>

      <v-col cols="12" class="d-flex align-center">
        <v-divider class=""></v-divider>
        <span class="mx-4">或者</span>
        <v-divider class=""></v-divider>
      </v-col>

      <v-col cols="12 text-center">
        <AuthProvider />
      </v-col>

      <Verify
        ref="verify"
        :mode="'pop'"
        :captcha-type="'clickWord'"
        :img-size="{ width: '400px', height: '200px' }"
        @success="verifySuccess"
      />
    </v-row>
  </v-form>
</template>


<script>
import Verify from "@/components/verifition/Verify";
import AuthProvider from "@/components/AuthProvider";
export default {
  name: "LoginForm",
  components: { Verify, AuthProvider },
  data() {
    return {
      checkbox: true,
      show1: false,
      form: {
        username: "",
        password: "",
      },
      usernameRules: [
        (v) => !!v || "用户名不能为空",
        (v) =>
          /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v) ||
          /^[a-zA-Z0-9]{3,50}$/.test(v) ||
          "请输入合法用户名或邮箱",
      ],
      passwordRules: [
        (v) => !!v || "密码不能为空",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/.test(v) ||
          "密码需要包含大小写英文字母和数字，长度在6~10位",
      ],
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        this.$refs.verify.refresh();
        this.$refs.verify.show();
      }
    },
    verifySuccess(params) {
      if (this.$refs.form.validate()) {
        // 提交表单
        this.$store
          .dispatch("Login", { ...this.form, ...params })
          .then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(() => {});
          })
          .catch((e) => {
            console.log("login:", e);
          });
      }
    },
  },
};
</script>