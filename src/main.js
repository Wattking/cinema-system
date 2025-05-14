import { createApp } from 'vue'   //node_modules下面
import { createPinia } from 'pinia'
import './style.css'
import App from './myFirstProject/App.vue'
import router from './myFirstProject/router/index.js'
//全局Vant组件
// 1. 引入你需要的组件
// import { Button } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

//导入配置文件
import './myFirstProject/util/config.js'

//element-plus引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()
var app = createApp(App)
app.use(router)//注册路由插件
app.use(pinia)//注册pinia插件
// app.use(Button)//3. 注册你需要的组件
app.use(ElementPlus)//全局注册element-plus插件
app.mount('#app') 