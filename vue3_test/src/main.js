import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import 'animate.css/animate.min.css';
import 'element-plus/dist/index.css'

//MARKED BEGIN
// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// 代码高亮
import hljs from 'highlight.js';

// 选择使用主题
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
//MARKED END

//引入Element-plus icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(Antd)
  .use(router)
  .use(VMdPreview)
  .use(store)
  .mount('#app');