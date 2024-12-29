import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router";
import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper';

let instance = null;
function render(props = {}) {
  const { container, activeRule } = props;
  instance = createApp(App);
  instance.use(router);


  instance?.mount(container ? container.querySelector("#app") : "#app");
  instance.config.globalProperties.$activeRule = activeRule;
}

const initQianKun = () => {
  renderWithQiankun({
      mount(props) {
        console.log('子应用启动后：', props);
        // await props.onGlobalStateChange((state) => {
        //   console.log("子应用接收的参数", state);
        //   state.publicPath && window.localStorage.setItem("mainJumpPublicPath", state.publicPath);
        // }, true);
        render(props);
      },
      bootstrap() { 
        console.log('子应用启动中...');
      },
      update() {  
        console.log('子应用已更新'); 
      },
      unmount() {
        console.log('子应用已卸载'); 
          instance.unmount();
          instance._container.innerHTML = "";
          instance = null;
      },
  });
};

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log("独立子应用渲染");
  render();
} else {
  console.log("qiankun渲染");
  initQianKun();
}