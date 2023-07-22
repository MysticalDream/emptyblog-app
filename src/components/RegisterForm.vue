<template>
  <v-form ref="form" @submit.prevent="submitForm" lazy-validation>
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          v-model="form.username"
          label="用户名"
          :rules="usernameRules"
          ref="username"
          :autocomplete="'username'"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="form.email"
          label="邮箱地址"
          :rules="emailRules"
          ref="email"
          :autocomplete="'email'"
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
          :autocomplete="'new-password'"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="form.confirmPassword"
          label="确认密码"
          :rules="confirmPasswordRules"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
          :autocomplete="'new-password'"
        ></v-text-field>

        <v-btn class="mt-6" color="primary" type="submit" block>注册</v-btn>
      </v-col>

      <v-col cols="12 text-center text-base">
        <span>已经有账号？</span>
        <router-link
          to="/user/login"
          v-text="'去登陆'"
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
import { register, checkUsername, checkEmail } from "@/api/account";
import { debounce } from "@/utils/common";
import Verify from "@/components/verifition/Verify";
import AuthProvider from "@/components/AuthProvider";

export default {
  name: "RegisterForm",
  components: { Verify, AuthProvider },
  data() {
    return {
      show1: false,
      show2: false,
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      checkUsername: true,
      checkEmail: true,
      usernameRules: [
        (v) => !!v || "用户名不能为空",
        (v) =>
          /^[a-zA-Z0-9]{3,50}$/.test(v) ||
          "用户名只能包含字母和数字，长度为3-50",
        () => this.checkUsername || "用户名已被注册",
      ],
      emailRules: [
        (v) => !!v || "邮箱地址不能为空",
        (v) =>
          /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v) ||
          "请输入正确的邮箱地址",
        () => this.checkEmail || "邮箱已被注册",
      ],
      passwordRules: [
        (v) => !!v || "密码不能为空",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/.test(v) ||
          "密码需要包含大小写英文字母和数字，长度在6~10位",
      ],
      confirmPasswordRules: [
        (v) => !!v || "确认密码不能为空",
        (v) => v === this.form.password || "两次输入的密码不一致",
      ],
    };
  },

  watch: {
    "form.username": debounce(function (n) {
      if (/^[a-zA-Z0-9]{3,50}$/.test(n)) {
        checkUsername(n).then((data) => {
          this.checkUsername = data.msg == "false";
          this.$refs.username.validate();
        });
      }
    }, 1000),
    "form.email": debounce(function (n) {
      if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(n)) {
        checkEmail(n).then((data) => {
          this.checkEmail = data.msg == "false";
          this.$refs.email.validate();
        });
      }
    }, 1000),
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        this.$refs.verify.refresh();
        this.$refs.verify.show();
      }
    },
    verifySuccess(params) {
      // 提交表单
      register({ ...this.form, ...params })
        .then(() => {
          // const username = this.form.username;
          const email = this.form.email;
          this.$alert(
            "请登录邮箱 " +
              email +
              " 通过在注册时收到的电子邮件的激活链接来激活您的账号",
            "系统提示",
            {
              dangerouslyUseHTMLString: true,
              type: "success",
            }
          )
            .then(() => {
              this.$router.push("/user/login");
            })
            .catch(() => {});
        })
        .catch((e) => {
          console.log("register:", e);
        });
    },
  },
};
</script>

<style scoped>
.custom-chip {
  border-style: unset;
}
.custom-chip:hover::before {
  opacity: 0;
}
</style>