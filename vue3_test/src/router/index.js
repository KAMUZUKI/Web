import { createRouter, createWebHistory } from 'vue-router'
// 1. 定义路由组件.
// 也可以从其他文件导入

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path: '/',
        name: 'content',
        component: () => import('@/components/MainFramework.vue'),
        meta: {
            title: '首页',
            transition_enter: 'animate__fadeInLeft',
            transition_leave: 'animate__fadeOutLeft',
        },
        children: [
            {
                path: '',
                name: 'articleList',
                component: () => import('@/components/Content/ContentComponent.vue'),
                meta: {
                    title: '文章列表',
                    transition_enter: 'animate__fadeInDown',
                    transition_leave: 'animate__fadeOutDown',
                }
            },
            {
                path: '/article/:id',
                name: 'article',
                component: () => import('@/components/Article/ArticleComponent.vue'),
                meta: {
                    title: '文章',
                    transition_enter: 'animate__fadeInDown',
                    transition_leave: 'animate__fadeOutDown',
                }
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('@/components/About/AboutComponent.vue'),
                meta: {
                    title: '关于',
                    transition_enter: 'animate__fadeInDown',
                    transition_leave: 'animate__fadeOutDown',
                }
            },
            {
                path: '/flink',
                name: 'flink',
                component: () => import('@/components/Flink/FlinkComponent.vue'),
                meta: {
                    title: '关于',
                    transition_enter: 'animate__fadeInDown',
                    transition_leave: 'animate__fadeOutDown',
                }
            }
        ]
    }, 
    {
        path: '/editor',
        name: 'editor',
        component: () => import('@/components/EditFramework.vue'),
        meta: {
            title: '编辑',
            transition_enter: 'animate__fadeInRight',
            transition_leave: 'animate__fadeOutLeft',
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