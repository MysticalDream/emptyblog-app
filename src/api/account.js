import request from "@/utils/request";

export function login(username, password,captchaVerification) {
  const data = {
    username,
    password,
    captchaVerification
  };
  return request({
    url: "/login",
    headers: {
      isToken: false,
    },
    method: "post",
    data: data,
  });
}

// 注册方法
export function register(data) {
  return request({
    url: "/register",
    headers: {
      isToken: false,
    },
    method: "post",
    data: data,
  });
}

//检查用户名是否存在
export function checkUsername(username) {
  return request({
    url: "/username/" + username,
    headers: {
      isToken: false,
    },
    method: "get",
  });
}

//检查邮箱是否存在
export function checkEmail(email) {
  return request({
    url: "/email/" + email,
    headers: {
      isToken: false,
    },
    method: "get",
  });
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: "/user/info",
    method: "get",
  });
}

// 退出方法
export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}
