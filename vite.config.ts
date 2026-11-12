import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tailwindcss from '@tailwindcss/vite';
import { templateCompilerOptions } from '@tresjs/core';

import path from 'path';

export default defineConfig({
  // 生产环境托管在子路径（如 https://www.t502.fun/vue-bits/）时通过
  // VUE_BITS_BASE=/vue-bits/ 注入；不设置则保持根路径的本地开发体验。
  base: process.env.VUE_BITS_BASE || '/',
  // 临时：允许局域网访问，方便手机/其他设备调试
  server: {
    host: true
  },
  plugins: [vue({ ...templateCompilerOptions }), vueJsx(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content': path.resolve(__dirname, 'src/content'),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
});
