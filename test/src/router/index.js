import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    
    {
        path: '/about', 
        component: ()=>import('../components/AboutComp.vue'),
        meta:{
            title:'首页',
            transition_enter: 'animate__fadeInRight',
            transition_leave: 'animate__fadeOutLeft'
        }
    },
    { 
        path: '/home', 
        component: ()=>import('../components/HomeComp.vue'),
        meta:{
            title:'首页',
            transition_enter: 'animate__fadeInLeft',
            transition_leave: 'animate__fadeIOutRight'
        }
    },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里a
// 暂时保持简单

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes // `routes: routes` 的缩写
})

export default router