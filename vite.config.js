import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import qiankun from 'vite-plugin-qiankun';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const origin = isDev ? 'http://localhost:3001' : 'http://www.hower.tech:3001';

  return {
    publicDir: 'static',
    base: '/admin',
    server: {
      port: 3001,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      cors: true,
      origin,
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
          api: 'modern-compiler',
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      DefineOptions(),
      // 导入svg的
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')], // icon存放的目录
        symbolId: 'icon-[name]', // symbol的id
        inject: 'body-last', // 插入的位置
        customDomId: '__svg__icons__dom__', // svg的id
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        dts: 'src/auto-import.d.ts', // 生成的全局变量放到此目录下
        eslintrc: { enabled: false }, // 改成true生成一次后禁用即可
      }),
      Components({
        dirs: ['src/components', 'src/layout/components'], // 后面布局组件也有相关的组件期望自动导入
        dts: 'src/components.d.ts',
        resolvers: [ElementPlusResolver()],
        directoryAsNamespace: true,
      }),
      qiankun('admin', {
        // 微应用名字，与主应用注册的微应用名字保持一致
        useDevMode: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
