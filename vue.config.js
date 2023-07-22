const { defineConfig } = require("@vue/cli-service");

let productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: "http://localhost:8081",
        ws: true,
        changeOrigin: true,
        pathRewrite: { ["^" + process.env.VUE_APP_BASE_API]: "" },
      },
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("CompressionPlugin").use("compression-webpack-plugin", [
        {
          filename: "[path][base].gz",
          algorithm: "gzip",
          // 要压缩的文件（正则）
          test: productionGzipExtensions,
          // 最小文件开启压缩
          threshold: 10240,
          minRatio: 0.8,
        },
      ]);
    }
  },
});
