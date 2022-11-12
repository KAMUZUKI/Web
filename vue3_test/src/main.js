import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import router from './router'
import 'ant-design-vue/dist/antd.css';
import 'animate.css/animate.min.css';
import 'element-plus/dist/index.css'

//MARKED BEGIN
// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';
// 选择使用主题
VMdPreview.use(vuepressTheme, {
  Prism,
});
//MARKED END

import store from './store'

const app = createApp(App);

app.use(Antd)
    .use(router)
    .use(VMdPreview)
    .use(store)
    .mount('#app');