import 'virtual:svg-icons-register';
import './assets/css/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import './utils/httpRequest';
// store 数据持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import mUi from './components';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import './public-path';

let app = null;
function render(props = {}) {
  const { container, activeRule } = props;

  // 创建应用实例
  app = createApp(App);

  // 统一配置
  app.use(router).use(createPinia().use(piniaPluginPersistedstate)).use(ElementPlus).use(mUi);

  // 注册图标组件
  Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
    app.component(key, component);
  });

  app?.mount(container ? container.querySelector('#app1') : '#app1');
  app.config.globalProperties.$activeRule = activeRule;
}

const initQianKun = () => {
  renderWithQiankun({
    mount(props) {
      render(props);
    },
    bootstrap() {
      console.log('子应用启动中...');
    },
    update() {
      console.log('子应用已更新');
    },
    unmount() {
      // 增强卸载清理
      app.unmount();
      app._container.innerHTML = '';
      app = null;
      history.destroy();
    },
  });
};

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('独立子应用渲染');
  render();
} else {
  console.log('qiankun渲染');
  initQianKun();
}
